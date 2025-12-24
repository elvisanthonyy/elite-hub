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

  const { register, handleSubmit } = useForm<FormFields>();
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
        {message && <div className="my-3 text-red-500">{message}</div>}
        <input
          className="flex px-5 shrink-0 text-sm w-full focus:outline-none h-13 my-2 rounded-xl bg-gray-200"
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
          {loading ? <ButtonLoading /> : "Login"}
        </button>
      </form>
      <Link className="w-[90%]" href="/auth/signup">
        <div className="my-3 cursor-pointer text-sm w-full border h-13 flex justify-center items-center rounded-xl">
          Sign Up
        </div>
      </Link>
    </div>
  );
};

export default LoginMain;
