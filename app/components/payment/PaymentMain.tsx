"use client";
import { ICourse } from "@/models/courses";
import api from "@/libs/api";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Course } from "../course/MyCoursesMain";

interface ChildProps {
  user: {
    id: string;
    name: string;
    email: string;
    courses: Course[];
  };

  course: ICourse;
}

const PaymentMain = ({ user, course }: ChildProps) => {
  const router = useRouter();
  const [orderId, setOrderId] = useState<string | undefined>("");
  console.log(orderId);
  const makePayment = () => {
    api
      .post("/api/paystack/initialize", {
        email: user.email,
        amount: course.amount,
      })
      .then((res) => {
        if (res.status) {
          const handler = (window as any).PaystackPop.setup({
            key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
            email: user.email,
            amount: course.amount * 100,
            ref: res.data.data.ref,
            metadata: {
              orderId: orderId,
            },
            callback: function (response: any) {
              router.replace(
                `https://precognizant-priscila-subterraneously.ngrok-free.dev/payment/success?ref=${response.reference}`
              );
            },
          });
          handler.openIframe();
        }
      })
      .catch((err) => {
        console.error("Error", err);
      });
  };

  useEffect(() => {
    //get userCourseId
    const userCourse = user.courses.find(
      (it) => it.courseId._id.toString() === course._id.toString()
    );

    setOrderId(userCourse?.userCourseId._id.toString());
  }, []);
  return (
    <div className="flex w-full py-10 h-[90dvh] bg-white mt-22">
      <div className="flex-col w-[90%] flex mx-auto">
        <div>{user.name}</div>
        <div>{user.email}</div>
        <div>{course.name}</div>
        <div>{course.description}</div>
        <div>{course.amount}</div>
        <button
          onClick={makePayment}
          className="w-full cursor-pointer rounded-3xl mb-20 mt-auto h-14 bg-black text-white mx-auto"
        >
          Pay
        </button>
      </div>
    </div>
  );
};

export default PaymentMain;
