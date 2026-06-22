import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import { User } from "@/models/user";
import { UserCourse } from "@/models/userCourse";
import { Course } from "@/models/courses";

interface ReqBody {
  userId: string;
  courseId: string;
  courseName: string;
}

const handler = async (req: Request) => {
  const { ref } = await req.json();

  const response = await fetch(
    `https://api.paystack.co/transaction/verify/${ref}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    },
  );

  const data = await response.json();
    const payment = data.data;
  const orderId = payment.metadata.orderId;

  if (!data.status || data.data.status !== "success") {
    return NextResponse.json({
      status: "error",
      course: userCourse,
      message: "Payment failed",
    });
  }



  if (!orderId) {
    return NextResponse.json({
      status: "error",
      course: userCourse,
      message: "missing orderId",
    });
  }


  if (!userCourse) {
    return NextResponse.json({
      status: "error",
      course: userCourse,
      message: "Course not found",
    });
  }

  if (userCourse.paymentStatus === "paid") {
    return NextResponse.json({
      status: "error",
      course: userCourse,
      message: "Course has been paid for",
    });
  }


  userCourse.paymentStatus = "paid";
  await userCourse.save();
  return NextResponse.json({
    status: "okay",
    course: userCourse,
    message: "Course has been paid for successfully",
  });
};

export { handler as POST };
