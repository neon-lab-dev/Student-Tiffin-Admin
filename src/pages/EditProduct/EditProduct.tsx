/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import Heading from "../../components/shared/Heading/Heading";
import InputField from "../../components/shared/InputField/InputField";
import { useEditProductMutation, useGetSingleProductByIdQuery } from "../../redux/Features/Products/productApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { ICONS } from "../../assets";
import { toast } from "sonner";

type TEditProductFormData = {
  name: string;
  img: any;
  ingredients: string[];
  description: string;
  price: string;
  availability: boolean;
};

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetSingleProductByIdQuery(id);

  const [editProduct] = useEditProductMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TEditProductFormData>();

  const [menuImage, setMenuImage] = useState<File | null>(null);
  const [ingredientsState, setIngredients] = useState<string[]>(data?.product?.ingredients || []);

  useEffect(() => {
    setValue("name", data?.product?.name);
    setValue("description", data?.product?.description);
    setValue("price", data?.product?.price);
    setValue("availability", data?.product?.availability.toString());
    setIngredients(data?.product?.ingredients || []);
  }, [data, setValue, data?.product?.name, data?.product?.description, data?.product?.price, data?.product?.availability, data?.product?.ingredients]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
      e.preventDefault();
      const newIngredient = e.currentTarget.value.trim();
      if (!ingredientsState.includes(newIngredient)) {
        setIngredients([...ingredientsState, newIngredient]);
        setValue("ingredients", [...ingredientsState, newIngredient]);
      }
      e.currentTarget.value = "";
    }
  };

  const removeIngredient = (index: number) => {
    const updatedIngredients = ingredientsState.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
    setValue("ingredients", updatedIngredients);
  };

  const handleAddProduct: SubmitHandler<TEditProductFormData> = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    if (menuImage) formData.append("file", menuImage);
    formData.append("price", data.price);

    for (const ingredient of ingredientsState) {
      formData.append("ingredients", ingredient);
    }

    // Append availability to formData
    formData.append("availability", data.availability.toString());

    toast.promise(editProduct({id, formData}).unwrap(), {
      loading: "Loading...",
      success: (response) => {
        navigate("/dashboard/menu");
        return response?.message || "Product updated successfully!";
      },
      error: (err) => {
        console.log(err)
        toast.error("Error updating product");
        return "Failed to update product.";
      },
    });
  };

  // Remove image handler
  const handleRemoveImage = () => {
    setMenuImage(null);  // Reset the image state
  };

  return (
    <div className="max-w-[840px] mx-auto pt-10">
      <Heading isArrowVisible={true} path="/dashboard/menu" title="Edit Product" />
      <form
        onSubmit={handleSubmit(handleAddProduct)}
        className="bg-white p-5 md:p-8 rounded-3xl w-full max-w-[840px] mx-auto flex flex-col gap-8 mt-8"
      >
        {/* Dish Name Field */}
        <InputField
          id="name"
          name="name"
          label="Dish Name"
          placeholder="Dish Name"
          defaultValue={name}
          required={true}
          error={errors.name}
          register={register("name", { required: "Dish name is required" })}
        />

        {/* Dish Image Field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="img" className="text-[#6E7883] font-Poppins leading-5">
            Dish Image
            <span className="text-[#DE3C4B]">*</span>
          </label>
          <input
            type="file"
            id="img"
            accept="image/*"
            {...register("img", {
              onChange: (e) => {
                setMenuImage(e.target.files ? e.target.files[0] : null);
                e.target.onChange && e.target.onChange(e);
              },
            })}
            className={`bg-[#6e788305] px-[18px] py-[14px] rounded-lg border focus:outline-none ${
              errors.img ? "border-red-500" : "border-[#6e78831f]"
            }`}
          />
          {errors.img && (
            <p className="text-red-500 text-sm">{errors.img.message as string}</p>
          )}
        </div>

        <div className="border w-[300px] h-[250px] p-2 rounded-xl relative">
          {menuImage ? (
            <img src={URL.createObjectURL(menuImage)} alt="Selected Image" className="object-cover" />
          ) : (
            <img src={data?.product?.image.thumbnailUrl} alt="Current Product Image" className="object-cover w-[300px] h-[250px]" />
          )}
          <img
            src={ICONS.cross}
            alt="cross-icon"
            className="size-8 cursor-pointer absolute top-2 right-2"
            onClick={handleRemoveImage}
          />
        </div>

        {/* Ingredients Field */}
        <InputField
          onKeyDown={handleKeyDown}
          id="ingredients"
          name="ingredients"
          label="Ingredients"
          placeholder="Ingredients Used"
          type="text"
          required={true}
        />

        {ingredientsState.length > 0 && (
          <div className="flex items-center gap-3">
            {ingredientsState.map((ingredient, index) => (
              <div className="bg-[#6e788305] text-[#424B54] border border-[#6e78831f] px-2 py-1 rounded-md flex items-center gap-1" key={index}>
                <p>{ingredient}</p>
                <img
                  onClick={() => removeIngredient(index)}
                  src={ICONS.cross}
                  alt="cross-icon"
                  className="size-5 cursor-pointer"
                />
              </div>
            ))}
          </div>
        )}

        {/* Price Field */}
        <InputField
          id="price"
          name="price"
          label="Price"
          placeholder="Price"
          required={true}
          error={errors.name}
          register={register("price", { required: "Price is required" })}
          defaultValue={data?.product?.price}
        />

        {/* Description Field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-[#6E7883] font-Poppins leading-5">
            Description
            <span className="text-[#DE3C4B]">*</span>
          </label>
          <textarea
            rows={5}
            id="description"
            placeholder="Write Description"
            {...register("description", { required: "Description is required" })}
            className={`bg-[#6e788305] px-[18px] py-[14px] rounded-lg border focus:outline-none ${
              errors.description ? "border-red-500" : "border-[#6e78831f]"
            }`}
            defaultValue={data?.product?.description}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        {/* Availability Dropdown */}
        <div className="flex flex-col gap-2">
          <label htmlFor="availability" className="text-[#6E7883] font-Poppins leading-5">
            Availability
            <span className="text-[#DE3C4B]">*</span>
          </label>
          <select
            id="availability"
            {...register("availability", { required: "Availability is required" })}
            className={`bg-[#6e788305] px-[18px] py-[14px] rounded-lg border focus:outline-none ${
              errors.availability ? "border-red-500" : "border-[#6e78831f]"
            }`}
            defaultValue={data?.product?.availability.toString()}
          >
            <option value={"true"}>Available</option>
            <option value={"false"}>Unavailable</option>
          </select>
          {errors.availability && <p className="text-red-500 text-sm">{errors.availability.message}</p>}
        </div>

        <hr className="border border-[#F2F2F2]" />

        {/* Submit Button */}
        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            className="px-6 py-[14px] text-white bg-[#8D9095] rounded-xl text-lg leading-6 font-semibold"
            onClick={() => navigate("/dashboard/menu")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-[14px] text-white bg-[#DE3C4B] rounded-xl text-lg leading-6 font-semibold"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
