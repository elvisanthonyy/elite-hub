import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import { User } from "@/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const handler = async () => {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({
      status: "error",
      message: "session not found",
    });
  }
  try {
    const user = await User.findById(session.user.id)
      .select("-password")
      .populate("courses.courseId")
      .populate("courses.userCourseId");
    if (!user) {
      return NextResponse.json({ status: "error", message: "user not found" });
    }

    return NextResponse.json({
      status: "okay",
      user,
    });
  } catch (error) {
    console.error("Error", error);
    return NextResponse.json({
      status: "error",
      message: "something went wrong",
    });
  }
};

export { handler as GET };
