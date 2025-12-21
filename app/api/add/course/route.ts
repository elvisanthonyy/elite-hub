import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import { User } from "@/models/user";

interface ReqBody {
  userId: string;
  courseId: string;
  courseName: string;
}

const handler = async (req: Request) => {
  await dbConnect();
  const { userId, courseId, courseName } = (await req.json()) as ReqBody;

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

    user?.courses?.push({ courseId: courseId, courseName });
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
