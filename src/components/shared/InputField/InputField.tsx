import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type TInputFieldProps= {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: FieldError;
  register?: UseFormRegisterReturn;
}

const InputField: React.FC<TInputFieldProps> = ({
  id,
  name,
  label,
  placeholder = "",
  type = "text",
  required = false,
  error,
  register,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[#6E7883] font-Poppins leading-5">
        {label}
        {required && <span className="text-[#DE3C4B]">*</span>}
      </label>
      <input
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        {...register} // Spread react-hook-form's register props
        className={`bg-[#6e788305] px-[18px] py-[14px] rounded-lg border focus:outline-none ${
          error ? "border-red-500" : "border-[#6e78831f]"
        }`}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default InputField;
