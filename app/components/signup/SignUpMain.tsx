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
    <div className="relative w-full flex-col h-dvh items-center bg-white flex justify-center py-20">
      <div className="absolute top-0 left-0 flex w-full justify-between border-b h-15  items-center p-5 bg-white">
        <div className="text-xl mt-2 font-bold ">Elite Hub</div>
        <Image
          src={"/elite_logo.svg"}
          width={50}
          height={50}
          alt="elite logo"
        />
      </div>
      <form
        className="flex flex-col items-center w-full mt-10 bg-white min-h-60 rounded-lg p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        {message && (
          <div className={`my-3 ${error ? "text-red-500" : "text-green-600"}`}>
            {message}
          </div>
        )}
        <input
          className="flex px-4 shrink-0 text-sm w-full focus:outline-none h-13 my-2 rounded-xl bg-gray-200"
          {...register("name", {
            required: "name is required",
          })}
          placeholder="name"
        />
        <input
          className="flex px-4 shrink-0 text-sm w-full focus:outline-none h-13 my-2 rounded-xl bg-gray-200"
          {...register("email", {
            required: "email is required",
          })}
          placeholder="email"
        />
        <input
          className="flex px-5 shrink-0 text-sm w-full focus:outline-none h-13 my-2 rounded-xl bg-gray-200"
          {...register("password", {
            required: "password is required",
          })}
          type="password"
          placeholder="password"
        />

        <button
          className="cursor-pointer flex justify-center items-center p-2 shrink-0 text-sm w-full focus:outline-none h-13 my-2 rounded-xl bg-black text-white"
          type="submit"
        >
          {loading ? <ButtonLoading /> : "Sign Up"}
        </button>
      </form>
      <Link className="w-[90%]" href="/auth/login">
        <div className="my-3 cursor-pointer text-sm w-full border h-13 flex justify-center items-center rounded-xl">
          Login
        </div>
      </Link>
    </div>
  );
};

export default SignUpMain;
