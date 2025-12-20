"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { redirect } from "next/navigation";
import { useSearchParams } from "next/navigation";

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

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setMessage(result.error);
    } else {
      setMessage("log in successfull");
      setTimeout(() => {
        redirect(redirectURL ? `/${redirectURL}` : "/dashboard");
      }, 1000);
    }
  };
  return (
    <div className="w-full flex-col h-dvh items-center flex justify-start py-20">
      <div className="flex w-[80%]  min-h-50 rounded-md flex-col items-center p-5 bg-white">
        <Image
          src={"/elite_logo.svg"}
          width={100}
          height={100}
          alt="elite logo"
        />
        <div className="text-xl mt-2 font-bold ">Elite Hub</div>
        {message && (
          <div
            className={`${
              message === "log in successfull"
                ? "text-green-600"
                : "text-red-600"
            } text-sm my-2`}
          >
            {message}
          </div>
        )}
      </div>
      <form
        className="flex flex-col items-center w-[80%] mt-10 bg-white min-h-60 rounded-lg p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
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
          value="Login"
        />
      </form>
    </div>
  );
};

export default LoginMain;
