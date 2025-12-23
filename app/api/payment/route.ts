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
  await dbConnect();
  const { userId, courseId } = (await req.json()) as ReqBody;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ status: "error", message: "user not found" });
    }

    const payment = user?.courses?.find(
      (it) => it.courseId.toString() === courseId
    );

    if (!payment) {
      return NextResponse.json({
        status: "error",
        message: "could not find payment",
      });
    }

    const userCourse = await UserCourse.findOne({
      userId: userId,
      courseId: courseId,
    });

    if (!userCourse) {
      return NextResponse.json({
        status: "error",
        message: "could not find user course",
      });
    }

    userCourse.paymentStatus = "paid";

    await userCourse.save();

    return NextResponse.json({
      status: "okay",
      message: "payment made",
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
