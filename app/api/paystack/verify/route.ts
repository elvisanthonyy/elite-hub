import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import { User } from "@/models/user";
import { UserCourse } from "@/models/userCourse";

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
    }
  );

  const data = await response.json();

  if (!data.status || data.data.status !== "success") {
    return NextResponse.json({
      status: "error",
      message: "Payment failed",
    });
  }

  const payment = data.data;
  const orderId = payment.metadata.orderId;

  if (!orderId) {
    return NextResponse.json({
      status: "error",
      message: "missing orderId",
    });
  }

  //getting user course and setting status to piad
  const userCourse = await UserCourse.findById(orderId);
  if (!userCourse) {
    return NextResponse.json({
      status: "error",
      message: "Course not found",
    });
  }

  userCourse.paymentStatus = "paid";
  await userCourse.save();
  return NextResponse.json({
    status: "okay",
    message: "Course has been paid for successfully",
  });
};

export { handler as POST };
