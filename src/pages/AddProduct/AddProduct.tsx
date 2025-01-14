/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubmitHandler, useForm } from "react-hook-form";
import Heading from "../../components/shared/Heading/Heading";
import InputField from "../../components/shared/InputField/InputField";
import { useState } from "react";
import { ICONS } from "../../assets";
import { useCreateProductMutation } from "../../redux/Features/Products/productApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type TAddProductFormData = {
  name: string;
  img: any;
  ingredients: string[];
  description: string;
  price: string;
  availability: boolean;
};

const AddProduct = () => {
  const [createProduct] = useCreateProductMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TAddProductFormData>();

  const [menuImage, setMenuImage] = useState<File | null>(null);
  const [ingredients, setIngredients] = useState<string[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
      e.preventDefault();
      const newIngredient = e.currentTarget.value.trim();
      if (!ingredients.includes(newIngredient)) {
        setIngredients([...ingredients, newIngredient]);
        setValue("ingredients", [...ingredients, newIngredient]);
      }
      e.currentTarget.value = "";
    }
  };

  const removeIngredient = (index: number) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
    setValue("ingredients", updatedIngredients);
  };

  const handleAddProduct: SubmitHandler<TAddProductFormData> = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    if (menuImage) formData.append("file", menuImage);
    formData.append("price", data.price);

    for (const ingredient of ingredients) {
      formData.append("ingredients", ingredient);
    }

    // Append availability to formData
    formData.append("availability", data.availability.toString());

    toast.promise(createProduct(formData).unwrap(), {
      loading: "Loading...",
      success: (response) => {
        navigate("/dashboard/menu");
        return response?.message || "Product created successfully!";
      },
      error: (err) => {
        console.error("Error creating product:", err);
        return "Failed to create product.";
      },
    });
  };

  return (
    <div className="max-w-[840px] mx-auto pt-10">
      <Heading
        isArrowVisible={true}
        path="/dashboard/menu"
        title="Add Product"
      />
      <form
        onSubmit={handleSubmit(handleAddProduct)}
        className="bg-white p-5 md:p-8 rounded-3xl w-full max-w-[840px] mx-auto flex flex-col gap-8 mt-8"
      >
        <h1 className="text-[#424B54] text-2xl font-semibold leading-8 border-b border-[#F3F3F3] pb-5">
          Add Product
        </h1>

        {/* Dish Name Field */}
        <InputField
          id="name"
          name="name"
          label="Dish Name"
          placeholder="Dish Name"
          required={true}
          error={errors.name}
          register={register("name", { required: "Dish name is required" })}
        />

        {/* Dish Image Field */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="img"
            className="text-[#6E7883] font-Poppins leading-5"
          >
            Dish Image
            <span className="text-[#DE3C4B]">*</span>
          </label>
          <input
            type="file"
            id="img"
            accept="image/*"
            // Combine the onChange handler with register
            {...register("img", {
              required: "Dish image is required",
              onChange: (e) => {
                // Custom file handling logic
                setMenuImage(e.target.files ? e.target.files[0] : null);
                // Call the default react-hook-form onChange
                e.target.onChange && e.target.onChange(e);
              },
            })}
            className={`bg-[#6e788305] px-[18px] py-[14px] rounded-lg border focus:outline-none ${
              errors.img ? "border-red-500" : "border-[#6e78831f]"
            }`}
          />
          {errors.img && (
            <p className="text-red-500 text-sm">
              {errors.img.message as string}
            </p>
          )}
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

        {ingredients.length > 0 && (
          <div className="flex items-center gap-3">
            {ingredients.map((ingedient, index) => (
              <div className="bg-[#6e788305] text-[#424B54] border border-[#6e78831f] px-2 py-1 rounded-md flex items-center gap-1">
                <p>{ingedient}</p>
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
        />

        {/* Description Field */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="description"
            className="text-[#6E7883] font-Poppins leading-5"
          >
            Description
            <span className="text-[#DE3C4B]">*</span>
          </label>
          <textarea
            rows={5}
            id="description"
            placeholder="Write Description"
            {...register("description", {
              required: "Description is required",
            })}
            className={`bg-[#6e788305] px-[18px] py-[14px] rounded-lg border focus:outline-none ${
              errors.description ? "border-red-500" : "border-[#6e78831f]"
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Availability Dropdown */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="availability"
            className="text-[#6E7883] font-Poppins leading-5"
          >
            Availability
            <span className="text-[#DE3C4B]">*</span>
          </label>
          <select
            id="availability"
            {...register("availability", {
              required: "Availability is required",
            })}
            className={`bg-[#6e788305] px-[18px] py-[14px] rounded-lg border focus:outline-none ${
              errors.availability ? "border-red-500" : "border-[#6e78831f]"
            }`}
          >
            <option value={"true"}>Available</option>
            <option value={"false"}>Unavailable</option>
          </select>
          {errors.availability && (
            <p className="text-red-500 text-sm">
              {errors.availability.message}
            </p>
          )}
        </div>

        <hr className="border border-[#6e78831f]" />

        {/* Submit Button */}
        <div className="flex items-center justify-end gap-4">
          <button
            type="submit"
            className="px-6 py-[14px] text-white bg-[#8D9095] rounded-xl text-lg leading-6 font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-[14px] text-white bg-[#DE3C4B] rounded-xl text-lg leading-6 font-semibold"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
