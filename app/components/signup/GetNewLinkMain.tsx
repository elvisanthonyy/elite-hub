"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import api from "@/libs/api";
import Link from "next/link";
import ButtonLoading from "../Loading/ButtonLoading";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface FormFields {
  email: string;
}

const GetNewLink = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    setLoading(true);
    api
      .post("/api/newlink", data)
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
        <div className="font-bold text-[24px]">Get Link</div>
      </div>
      <form
        className="flex flex-col items-center w-full mt-8 bg-white rounded-lg px-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {errors.email && (
          <div
            className={`my-3 text-red-500 text-[14px] text-left w-full px-4`}
          >
            {errors.email.message}
          </div>
        )}
        <input
          className="flex shrink-0 text-black-3 mb-4 text-[16px] text-sm w-[98%] focus:outline-none py-3.5 px-3 bg-white-2 rounded-[16px]"
          {...register("email", {
            required: "email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Please enter a valid email",
            },
          })}
          placeholder="email"
        />

        {message && (
          <div
            className={`text-[14px] text-left w-full px-2 ${error ? "text-red-500" : "text-green-600"}`}
          >
            {message}
          </div>
        )}
        <button
          className="cursor-pointer flex justify-center items-center p-2 shrink-0 text-[16px] w-full focus:outline-none py-5 my-3 rounded-[32px] bg-black-3 text-white"
          type="submit"
        >
          {loading ? <ButtonLoading /> : "Send Link"}
        </button>
      </form>
    </div>
  );
};

export default GetNewLink;
