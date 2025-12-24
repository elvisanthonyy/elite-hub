"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import api from "@/libs/api";
import { useRouter } from "next/navigation";

const PaymentVerifyMain = () => {
  const router = useRouter();
  const searchParam = useSearchParams();
  const ref = searchParam.get("ref");

  useEffect(() => {
    api
      .post("/api/paystack/verify", { ref })
      .then((res) => {
        if (res.data.status === "okay") {
          alert(res.data.message);
          setTimeout(() => {
            router.push("/dashboard");
          }, 1000);
        }
      })
      .catch((err) => {
        console.error("Error", err);
      });
  });
  return (
    <div className="flex justify-center items-center w-[90%] h-[70dvh] bg-white rounded-2xl">
      Verifying payment .......
    </div>
  );
};

export default PaymentVerifyMain;
