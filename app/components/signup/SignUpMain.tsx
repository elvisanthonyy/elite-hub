"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import api from "@/libs/api";
import Link from "next/link";
import ButtonLoading from "../Loading/ButtonLoading";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface FormFields {
  name: string;
  email: string;
  password: string;
}

const SignUpMain = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
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
      })
      .catch((error) => {
        console.error("error", error);
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
            className="w-[32px]"
          />
        </div>
        <div className="font-bold text-[20px]">Sign Up</div>
      </div>
      <form
        className="flex flex-col items-center w-full mt-8 bg-white rounded-lg px-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {message && (
          <div className={`my-3 ${error ? "text-red-500" : "text-green-600"}`}>
            {message}
          </div>
        )}
        <input
          className="flex shrink-0 text-black-5 mb-6 text-[18px] text-sm w-full focus:outline-none py-3.5 border-b border-black-5"
          {...register("name", {
            required: "name is required",
          })}
          placeholder="name"
        />
        <input
          className="flex shrink-0 text-black-5 mb-6 text-[18px] text-sm w-full focus:outline-none py-3.5 border-b border-black-5"
          {...register("email", {
            required: "email is required",
          })}
          placeholder="email"
        />
        <input
          className="flex shrink-0 text-black-5 mb-6 text-[18px] text-sm w-full focus:outline-none py-3.5 border-b border-black-5"
          {...register("password", {
            required: "password is required",
          })}
          type="password"
          placeholder="password"
        />

        <button
          className="cursor-pointer flex justify-center items-center p-2 shrink-0 text-sm w-full focus:outline-none py-6 my-2 rounded-[32px] bg-black-3 text-white"
          type="submit"
        >
          {loading ? <ButtonLoading /> : "Sign Up"}
        </button>
      </form>
      <div className="flex items-center">
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
