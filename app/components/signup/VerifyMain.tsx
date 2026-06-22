"use client";
import { useState, useEffect } from "react";
import VerifyLoading from "../Loading/VerifyLoading";
import api from "@/libs/api";
import Link from "next/link";
import Image from "next/image";
import EliteLoading from "../Loading/EliteLoading";

interface ChildProps {
  [key: string]: string | string[] | undefined;
}
const VerifyMain = ({ token }: ChildProps) => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  useEffect(() => {
    api
      .post("/api/verify", { verificationToken: token })
      .then((res) => {
        setLoading(false);
        setMessage(res.data.message);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error", err);
      });
  }, []);
  return (
    <div className="w-full relative h-dvh flex flex-col justify-center items-center rounded-lg">
      <div className="w-full h-full absolute top-0 left-0">
        <Image
          src={"/designs/auth-page-design.svg"}
          width={1000}
          height={1000}
          alt="elite logo"
          className="w-full"
        />
      </div>
      {loading ? (
        <div className="flex-col flex items-center">
          <EliteLoading />

          <div className="text-lg font-semibold w-full text-center mt-4">
            Verifying Email
          </div>
        </div>
      ) : (
        <div className="w-full relative h-full flex justify-center items-center flex-col">
          {message === "user verified" ? (
            <div className="grid gap-y-2 mt-16 h-fit justify-items-center items-center">
              <div>
                <Image
                  src={"/designs/confeti.svg"}
                  width={1000}
                  height={1000}
                  alt="elite logo"
                  className="w-full"
                  draggable={false}
                />
              </div>
              <div className="text-[24px] text-black-2 font-bold">
                Congratulations!!
              </div>
              <div className="text-center text-black-4 text-[16px]">
                You've successfully verified <br />
                your email.
              </div>
              <Link
                href={"/auth/login"}
                className="px-4 py-2 pointer-cursor text-center bg-black-3 text-white mt-4 rounded-[4px]"
              >
                Login
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="mb-4">{message}</div>
              <Link
                href={"/auth/newlink"}
                className="px-4 py-2 pointer-cursor bg-black-3 text-white rounded-[8px]"
              >
                Get New Link
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VerifyMain;
