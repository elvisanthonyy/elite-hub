"use client";
import { useState, useEffect } from "react";
import VerifyLoading from "../Loading/VerifyLoading";
import api from "@/libs/api";
import Link from "next/link";

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
    <div className="flex flex-col justify-center items-center rounded-lg w-[70%] aspect-square bg-white">
      {loading ? (
        <VerifyLoading />
      ) : (
        <div className="w-full relative h-full flex justify-center items-center flex-col">
          <div
            className={`${
              message === "user verified"
                ? "text-green-600 mb-10"
                : "text-red-600"
            }`}
          >
            {message}
          </div>
          {message === "user verified" && (
            <button className="text-white absolute bottom-10 text-sm rounded-lg bg-linear-to-br from-blue-700 to-blue-500 px-11 py-3 w-[85%] h-13 ">
              <Link href="/auth/login">Login</Link>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default VerifyMain;
