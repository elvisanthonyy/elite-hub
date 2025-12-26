"use client";
import { ICourse } from "@/models/courses";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Course } from "../course/MyCoursesMain";
import ButtonLoading from "../Loading/ButtonLoading";

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
  const [loading, setLoading] = useState(false);
  console.log(orderId);
  const makePayment = () => {
    if (!(window as any).PaystackPop) {
      alert("Paystack not ready");
      return;
    }

    setLoading(true);

    const handler = (window as any).PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
      email: user.email,
      amount: course.amount * 100,
      ref: String(Date.now()),
      metadata: {
        orderId: orderId,
      },
      callback: function (response: any) {
        setLoading(false);
        router.replace(`/payment/success?ref=${response.reference}`);
      },
      onClose: () => {
        setLoading(false);
      },
    });
    handler.openIframe();
  };

  useEffect(() => {
    //get userCourseId
    const userCourse = user.courses.find(
      (it) => it.courseId._id.toString() === course._id.toString()
    );

    setOrderId(userCourse?.userCourseId._id.toString());
  }, []);
  return (
    <>
      <Script
        src="https://js.paystack.co/v1/inline.js"
        strategy="afterInteractive"
      />
      <div className="flex w-full py-10 h-[90dvh] bg-white mt-22">
        <div className="flex-col w-[90%] flex mx-auto">
          <div>{user.name}</div>
          <div>{user.email}</div>
          <div>{course.name}</div>
          <div>{course.description}</div>
          <div>{course.amount}</div>

          <button
            onClick={makePayment}
            type="button"
            className="w-full cursor-pointer rounded-3xl mb-20 mt-auto h-14 bg-black text-white mx-auto"
          >
            {loading ? <ButtonLoading /> : "Pay"}
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentMain;
