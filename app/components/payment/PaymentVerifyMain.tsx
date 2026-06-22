"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import api from "@/libs/api";
import { useRouter } from "next/navigation";
import EliteLoading from "../Loading/EliteLoading";
import Image from "next/image";
import Link from "next/link";
import { IUserCourse } from "@/models/userCourse";

const PaymentVerifyMain = () => {
  const router = useRouter();
  const searchParam = useSearchParams();
  const ref = searchParam.get("ref");
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [course, setCourse] = useState<IUserCourse | null>(null);
  const [message, setMessage] = useState("")
  useEffect(() => {
    setLoading(true);
    api
      .post("/api/paystack/verify", { ref })
      .then((res) => {
        setMessage(res.data.message)
        if (res.data.message === "Course has been paid for successfully") {
          setStatus("success");
          setLoading(false);
          setCourse(res.data.course);
        } else {
          setStatus("failed");
          setLoading(false);
          setCourse(res.data.course);
        }
      })
      .catch((err) => {
        console.error("Error", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div className="flex flex-col justify-center items-center w-full h-dvh bg-white rounded-2xl">
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
            Verifying Payment
            
          </div>
        </div>
      ) : (
        <div className="w-full relative h-full flex justify-center items-center flex-col">
          {status === "success" ? (
            <div className="flex flex-col items-center gap-4 text-green-500 font-bold">
              <div>Payment verified successfully!</div>
              <Link className="px-4 text-center flex w-fit rounded-[16px] py-4 bg-black-3 text-white" href={`/course/${course?.courseName}`}>View Course</Link>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 text-red-500 font-bold">
              <div>{`${message}!!`}</div>
              <Link className="px-4 text-center flex w-fit rounded-[16px] py-4 bg-black-3 text-white" href={`/course/${course?.courseName}`}>Go back to Course</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentVerifyMain;
