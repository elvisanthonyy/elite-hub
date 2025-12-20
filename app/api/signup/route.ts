import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import { User } from "@/models/user";
import bcrypt from "bcryptjs";
import crypto from "crypto";

interface ReqBody {
  name: string;
  email: string;
  password: string;
}

const handler = async (req: Request) => {
  await dbConnect();
  try {
    const { name, email, password } = (await req.json()) as ReqBody;
    const existingUSer = await User.findOne({ email: email });
    if (existingUSer) {
      return NextResponse.json({
        status: "error",
        message: "user already existing",
      });
    }
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpiry = new Date(Date.now() + 1000 * 60 * 60);
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
      verificationToken: verificationToken,
      verificationTokenExpiry: verificationTokenExpiry,
      courses: [],
    });
    await user.save();

    return NextResponse.json({
      status: "okay",
      message: "user has been created",
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
