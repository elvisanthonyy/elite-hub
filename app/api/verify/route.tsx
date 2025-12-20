import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import { User } from "@/models/user";

const handler = async (req: Request) => {
  await dbConnect();
  const { verificationToken } = await req.json();
  try {
    const user = await User.findOne({ verificationToken: verificationToken });

    if (!user) {
      return NextResponse.json({
        status: "error",
        message: "could not complete",
      });
    }
    if (user.isVerified) {
      user.isVerified = true;
      user.verificationToken = "";
      user.verificationTokenExpiry = undefined;

      await user.save();
      return NextResponse.json({
        status: "error",
        message: "user already verified",
      });
    }
    const newDate = new Date(Date.now());
    if (newDate > user?.verificationTokenExpiry) {
      return NextResponse.json({
        status: "error",
        message: "link expired",
      });
    }

    user.isVerified = true;
    user.verificationToken = "";
    user.verificationTokenExpiry = undefined;
    await user.save();
    return NextResponse.json({
      status: "okay",
      message: "user verified",
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "something went wrong",
    });
  }
};

export { handler as POST };
