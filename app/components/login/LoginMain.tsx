"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { redirect } from "next/navigation";
import { useSearchParams } from "next/navigation";
import ButtonLoading from "../Loading/ButtonLoading";
import Link from "next/link";

interface FormFields {
  email: string;
  password: string;
}

const LoginMain = () => {
  const param = useSearchParams();
  const redirectURL = param.get("redirectUrl");
  console.log(redirectURL);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
    setLoading(true);
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setLoading(false);
      setMessage(result.error);
    } else {
      setLoading(false);
      setMessage("log in successfull");
      setTimeout(() => {
        redirect(redirectURL ? `/${redirectURL}` : "/dashboard");
      }, 1000);
    }
  };
  return (
    <div className="relative top-0 w-full flex-col h-dvh items-center bg-white flex justify-center ">
      <div className="-mt-40">
        <Image
          src={"/designs/auth-page-design.svg"}
          width={1000}
          height={1000}
          alt="elite logo"
          className="w-full"
        />
      </div>
      <div className="flex items-center justify-start w-full px-4 mt-8">
        <div className="flex mb-1 mr-2 justify-start items-center">
          <Image
            src={"/icons/elite-logo.svg"}
            alt="logo"
            height={40}
            width={40}
            className="w-[40px]"
          />
        </div>
        <div className="font-bold text-[24px]">Login</div>
      </div>

      <form
        className="flex flex-col items-center w-full mt-8 bg-white rounded-lg px-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {errors.email && (
          <div className={`text-red-500 text-[14px] text-left w-full px-4`}>
            {errors.email.message}
          </div>
        )}
        <input
          className="flex shrink-0 text-black-3 mb-4 text-[16px] text-sm w-full focus:outline-none py-3.5 px-3 bg-white-2 rounded-[16px]"
          {...register("email", {
            required: "email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Please enter a valid email",
            },
          })}
          placeholder="email"
        />
        {errors.password && (
          <div className={`text-red-500 text-[14px] text-left w-full px-4`}>
            {errors.password.message}
          </div>
        )}
        <input
          className="flex shrink-0 text-black-3 mb-4 text-[16px] text-sm w-full focus:outline-none py-3.5 px-3 bg-white-2 rounded-[16px]"
          {...register("password", {
            required: "password is required",
          })}
          type="password"
          placeholder="password"
        />
        <div className="w-full text-[14px] text-blue-500 flex justify-end mb-4 cursor-pointer">
          <Link href="/auth/forgot-password">Forgot Password?</Link>
        </div>
        {message && (
          <div className="my-3 text-red-500 w-full text-center">{message}</div>
        )}
        <button
          className="cursor-pointer flex text-[16px] justify-center items-center p-2 shrink-0 text-sm w-full focus:outline-none py-5 my-3 rounded-[32px] bg-black-3 text-white"
          type="submit"
        >
          {loading ? <ButtonLoading /> : "Login"}
        </button>
      </form>
      <div className="flex items-center">
        Don't have an account?
        <Link className="ml-2" href="/auth/signup">
          <div className="my-3 cursor-pointer w-full flex justify-center items-center rounded-xl">
            Sign Up
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LoginMain;
