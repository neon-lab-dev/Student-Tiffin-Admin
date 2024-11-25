import { useState } from "react";
import { ICONS } from "../../assets";
import InputField from "../../components/shared/InputField/InputField";
import { useForm, SubmitHandler } from "react-hook-form";

type TLoginFormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const [isPasswordVissible, setIsPasswordVissible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginFormValues>();

  const handleLogin: SubmitHandler<TLoginFormValues> = (data) => {
    console.log("Form submitted data:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="bg-white p-5 md:p-8 rounded-xl w-full max-w-[564px] mx-auto flex flex-col gap-8"
    >
      <h1 className="text-[#424B54] text-2xl font-semibold leading-8 border-b border-[#F3F3F3] pb-5">
        Login
      </h1>
      <InputField
        id="email"
        name="email"
        label="Email ID"
        placeholder="Email ID"
        type="text"
        required={true}
        error={errors.email}
        register={register("email", { required: "Email ID is required" })}
      />
      <div className="relative">
        <InputField
          id="password"
          name="password"
          label="Password"
          placeholder="Password"
          type={isPasswordVissible ? "text" : "password"}
          required={true}
          error={errors.password}
          register={register("password", { required: "Password is required" })}
        />
        <img
          onClick={() => setIsPasswordVissible(!isPasswordVissible)}
          src={isPasswordVissible ? ICONS.eyeClose : ICONS.eyeOpen}
          alt=""
          className="size-5 cursor-pointer absolute top-11 right-5"
        />
      </div>
      <button
        type="submit"
        className="p-5 text-white bg-[#DE3C4B] rounded-xl text-lg leading-6 font-semibold"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
