/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubmitHandler, useForm } from "react-hook-form";
import Heading from "../../components/shared/Heading/Heading";
import InputField from "../../components/shared/InputField/InputField";

type TAddProductFormData = {
  dishName: string;
  img: any;
  ingredients: string;
  description: string;
};

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAddProductFormData>();

  const handleAddProduct: SubmitHandler<TAddProductFormData> = (data) => {
    console.log("Form submitted data:", data);
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
          id="dishName"
          name="dishName"
          label="Dish Name"
          placeholder="Dish Name"
          required={true}
          error={errors.dishName}
          register={register("dishName", { required: "Dish name is required" })}
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
            {...register("img", { required: "Dish image is required" })}
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
          id="ingredients"
          name="ingredients"
          label="Ingredients"
          placeholder="Ingredients Used"
          type="text"
          required={true}
          error={errors.ingredients}
          register={register("ingredients", {
            required: "Ingredients are required",
          })}
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
