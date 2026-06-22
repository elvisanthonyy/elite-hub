"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import api from "@/libs/api";
import Link from "next/link";
import ButtonLoading from "../Loading/ButtonLoading";
import { useState } from "react";
import InputError from "../others/InputError";
import { FaLock } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

interface FormFields {
  name: string;
  email: string;
  password: string;
}

const SignUpMain = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    setLoading(true);
    api
      .post("/api/signup", data)
      .then((res) => {
        if (res.data.status === "okay") {
          setError(false);
          setMessage("Verification link has been set to your mail");
        } else {
          setError(true);
          setMessage(res.data.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("error", error);
        setLoading(false);
      });
  };
  return (
    <div className="relative w-full flex-col h-dvh items-center bg-white flex">
      <div className="-mt-8">
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
        <div className="font-bold text-[24px]">Sign Up</div>
      </div>
      <form
        className="flex flex-col mb-4 items-center w-full mt-8 bg-white rounded-lg px-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {errors.name && <InputError message={errors.name.message} />}
        <div className="relative w-full h-fit mb-4">
          <div className="absolute top-[50%] -translate-y-[50%] left-3 text-black-4">
            <FaUser className="" />
          </div>
          <input
            className="flex shrink-0 text-black-3 text-[16px] text-sm w-full focus:outline-none py-3.5 px-9 bg-white-2 rounded-[16px]"
            {...register("name", {
              required: "name is required",
            })}
            placeholder="name"
          />
        </div>
        {errors.email && <InputError message={errors.email.message} />}
        <div className="relative w-full h-fit mb-4">
          <div className="absolute top-[50%] mt-[1.5px] -translate-y-[50%] left-3 text-black-4">
            <FaEnvelope className="" />
          </div>
          <input
            className="flex shrink-0 text-black-3 text-[16px] text-sm w-full focus:outline-none py-3.5 px-9 bg-white-2 rounded-[16px]"
            {...register("email", {
              required: "email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email",
              },
            })}
            placeholder="email"
          />
        </div>
        {errors.password && <InputError message={errors.password.message} />}
        <div className="relative w-full h-fit mb-4">
          <div className="absolute top-[50%] mt-[1.5px] -translate-y-[50%] left-3 text-black-4">
            <FaLock className="" />
          </div>
          <input
            className="flex shrink-0 text-black-3  text-[16px] text-sm w-full focus:outline-none py-3.5 px-10 bg-white-2 rounded-[16px]"
            {...register("password", {
              required: "password is required",
            })}
            type={showPassword ? "text" : "password"}
            placeholder="password"
          />
          <div className="absolute top-[50%] mt-[1.5px] -translate-y-[50%] right-4 text-black-4">
            {showPassword ? (
              <FaEyeSlash
                className="cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <FaEye
                className="cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
        </div>

        {message && (
          <div
            className={`text-[14px] ${error ? "text-red-500" : "text-green-600"}`}
          >
            {message}
          </div>
        )}
        <button
          className="cursor-pointer flex justify-center items-center p-2 shrink-0 text-[16px] w-full focus:outline-none py-5 my-3 rounded-[32px] bg-black-3 text-white"
          type="submit"
        >
          {loading ? <ButtonLoading /> : "Sign Up"}
        </button>
      </form>
      <div className="flex w-[70%] items-center gap-4 text-[16px] text-black-3 mb-4">
        <div className="h-px bg-black-5 flex-1"></div>
        <div className="font-semibold">Or</div>
        <div className="h-px bg-black-5 flex-1"></div>
      </div>
      <div className="flex items-center text-[16px] text-black-3 mb-4">
        <Link className="flex items-center" href="/auth/login">
          <div className="mr-2 text-[32px]">
            <FcGoogle />
          </div>
          <div className="my-3 cursor-pointer w-full flex justify-center items-center rounded-xl">
            Sign Up With Google
          </div>
        </Link>
      </div>
      <div className="flex items-center text-[16px] text-black-3">
        Have an account?
        <Link className="ml-2" href="/auth/login">
          <div className="my-3 cursor-pointer w-full flex justify-center items-center rounded-xl">
            Login
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SignUpMain;
