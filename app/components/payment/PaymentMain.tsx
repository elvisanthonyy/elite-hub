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
      (it) => it.courseId._id.toString() === course._id.toString(),
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
        <div className="flex-col w-full  px-6 flex mx-auto">
          <div className="flex flex-col gap-2 mb-4">
            <div className="font-semibold text-[18px] text-black-3">Name</div>
            <div className="border rounded-[8px] border-black-5 text-[16px] text-2xl px-2 py-4">
              {user.name}
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <div className="font-semibold text-[18px] text-black-3">Email</div>
            <div className="border rounded-[8px] border-black-5 text-[16px] text-2xl px-2 py-4">
              {user.email}
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <div className="font-semibold text-[18px] text-black-3">Course</div>
            <div className="border rounded-[8px] border-black-5/30 text-[16px] text-2xl px-2 py-4">
              {course.name}
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <div className="font-semibold text-[18px] text-black-3">Amount</div>
            <div className="border rounded-[8px] border-black-5/30 text-[16px] text-2xl px-2 py-4">
              {`₦${course.amount}`}
            </div>
          </div>

          <button
            onClick={makePayment}
            type="button"
            className="w-full cursor-pointer text-16 rounded-[16px] py-5 mb-20 mt-8 bg-black-2 text-white mx-auto"
          >
            {loading ? <ButtonLoading /> : "Pay"}
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentMain;
