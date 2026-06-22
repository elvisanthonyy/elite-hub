import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import { User } from "@/models/user";
import { UserCourse } from "@/models/userCourse";

interface ReqBody {
  userId: string;
  courseId: string;
  courseName: string;
  courseAmount: Number;
}

const handler = async (req: Request) => {
  await dbConnect();
  const { userId, courseId, courseName, courseAmount } =
    (await req.json()) as ReqBody;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ status: "error", message: "user not found" });
    }

    const chechIfCOurseExist = user.courses?.find(
      (it: any) => it.courseId.toString() === courseId
    );

    if (chechIfCOurseExist) {
      return NextResponse.json({
        status: "error",
        message: "course already added",
        chechIfCOurseExist,
      });
    }

    const userCourse = new UserCourse({
      userId: userId,
      courseId: courseId,
      courseName: courseName,
      amount: courseAmount,
    });

    await userCourse.save();
    user.courses?.push({
      courseId: courseId,
      courseName: courseName,
      userCourseId: userCourse._id,
    });
    await user.save();
    return NextResponse.json({
      status: "okay",
      message: "course added",
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
