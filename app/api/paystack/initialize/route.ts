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
  const { email, amount } = await req.json();

  const response = await fetch(
    "https://api.paystack.co/transaction/initialize",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: amount * 100,
        callback_url:
          "https://precognizant-priscila-subterraneously.ngrok-free.dev/payment/success",
      }),
    }
  );

  const data = await response.json();
  return NextResponse.json(data);
};

export { handler as POST };
