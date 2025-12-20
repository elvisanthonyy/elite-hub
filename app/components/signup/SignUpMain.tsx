"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import api from "@/libs/api";

interface FormFields {
  name: string;
  email: string;
  password: string;
}

const SignUpMain = () => {
  const { register, handleSubmit } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    api
      .post("/api/signup", data)
      .then((res) => {})
      .catch((error) => {
        console.error("error", error);
      });
  };
  return (
    <div className="w-full flex-col h-dvh items-center flex justify-start py-20">
      <div className="flex w-[80%] h-50 rounded-md flex-col items-center p-5 bg-white">
        <Image
          src={"/elite_logo.svg"}
          width={100}
          height={100}
          alt="elite logo"
        />
        <div className="text-xl mt-2 font-bold">Elite Hub</div>
      </div>
      <form
        className="flex flex-col items-center w-[80%] mt-10 bg-white min-h-60 rounded-lg p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="flex shrink-0 p-2 text-sm w-full focus:outline-none h-11 my-2 rounded-sm bg-gray-300"
          {...register("name", {
            required: "name is required",
          })}
          placeholder="name"
        />
        <input
          className="flex p-2 shrink-0 text-sm w-full focus:outline-none h-11 my-2 rounded-sm bg-gray-300"
          {...register("email", {
            required: "email is required",
          })}
          placeholder="email"
        />
        <input
          className="flex p-2 shrink-0 text-sm w-full focus:outline-none h-11 my-2 rounded-sm bg-gray-300"
          {...register("password", {
            required: "password is required",
          })}
          type="password"
          placeholder="password"
        />
        <input
          className="flex p-2 shrink-0 text-sm w-full focus:outline-none h-12 my-2 rounded-sm bg-black text-white"
          type="submit"
          value="Sign Up"
        />
      </form>
    </div>
  );
};

export default SignUpMain;
