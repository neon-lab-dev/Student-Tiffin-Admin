/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { KeyboardEventHandler } from "react";
import { FieldError, Merge, UseFormRegisterReturn } from "react-hook-form";

type TInputFieldProps= {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: Merge<FieldError, (FieldError | undefined)[]> | undefined;
  register?: UseFormRegisterReturn;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  defaultValue? :any
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
  onKeyDown,
  defaultValue,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[#6E7883] font-Poppins leading-5">
        {label}
        {required && <span className="text-[#423839]">*</span>}
      </label>
      <input
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        onKeyDown={onKeyDown}
        defaultValue={defaultValue}
        {...register}
        className={`bg-[#6e788305] px-[18px] py-[14px] rounded-lg border focus:outline-none ${
          error ? "border-red-500" : "border-[#6e78831f]"
        }`}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default InputField;
