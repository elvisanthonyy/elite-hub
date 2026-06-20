import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import { User } from "@/models/user";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendVerificationMessage } from "@/libs/sendVerificationLink";

interface ReqBody {
  email: string;
}

const handler = async (req: Request) => {
  await dbConnect();
  try {
    const { email } = (await req.json()) as ReqBody;
    const existingUSer = await User.findOne({ email: email });
    if (!existingUSer) {
      return NextResponse.json({
        status: "error",
        message: "user not found",
      });
    }
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpiry = new Date(Date.now() + 1000 * 60 * 60);

    existingUSer.verificationToken = verificationToken;
    existingUSer.verificationTokenExpiry = verificationTokenExpiry;
    await existingUSer.save();

    await sendVerificationMessage(email, verificationToken);

    return NextResponse.json({
      status: "okay",
      message: "verification link has been sent",
    });
  } catch (error) {
    console.error("Error", error);
    return NextResponse.json({
      status: "error",
      message: "something went wrong",
    });
  }
};

export { handler as POST };
