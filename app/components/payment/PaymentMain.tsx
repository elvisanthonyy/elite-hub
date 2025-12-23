"use client";
import { ICourse } from "@/models/courses";
import api from "@/libs/api";
import { useRouter } from "next/navigation";
import { verify } from "crypto";

interface ChildProps {
  user: {
    id: string;
    name: string;
    email: string;
  };

  course: ICourse;
}

const PaymentMain = ({ user, course }: ChildProps) => {
  const router = useRouter();
  const makePayment = () => {
    const handler = (window as any).PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
      email: user.email,
      amount: course.amount * 100,
      ref: Date.now().toString(),
      callback: function (response: any) {
        console.log("paid", response.reference);
      },
    });
    handler.openIframe();
  };
  return (
    <div className="flex w-full py-10 h-[90dvh] bg-white mt-28">
      <div className="flex-col w-[85%] flex mx-auto">
        <div>{user.name}</div>
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
