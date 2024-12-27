import { useState } from "react";
import { ICONS } from "../../assets";
import InputField from "../../components/shared/InputField/InputField";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../redux/hooks";
import { useLoginMutation } from "../../redux/Features/Auth/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { setUser } from "../../redux/Features/Auth/authSlice";

type TLoginFormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isPasswordVissible, setIsPasswordVissible] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginFormValues>();

  const handleLogin: SubmitHandler<TLoginFormValues> = async (data) => {
    const loginData = {
      email: data.email,
      password: data.password,
    };
    try {
      const response = await login(loginData).unwrap();
      if (response) {
        dispatch(setUser({ user: response.user }));
        Cookies.set("isAuthenticated", "true");
        toast.success("Welcome Back!!");
      }

      navigate("/dashboard/users");
    } catch (err) {
      toast.error("Something went wrong! Please try again.");
    }
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
        className={`${
          isLoading ? "bg-[#b1303d]" : "bg-[#DE3C4B]"
        } p-5 text-white  rounded-xl text-lg font-semibold`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-3">
            <p>Login</p>
            {/* Loader */}
            <div className="size-7 flex gap-1 items-center justify-center">
              <div className="size-[6px] animate-[bounce_.6s_linear_.2s_infinite] bg-white rounded-full"></div>
              <div className="size-[6px] animate-[bounce_.6s_linear_.3s_infinite] bg-white rounded-full"></div>
              <div className="size-[6px] animate-[bounce_.6s_linear_.4s_infinite] bg-white rounded-full"></div>
            </div>
          </div>
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
};

export default Login;
