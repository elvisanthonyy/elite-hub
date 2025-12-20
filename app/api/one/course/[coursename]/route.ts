import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import { Course } from "@/models/courses";

const handler = async (
  req: Request,
  {
    params,
  }: {
    params: Promise<{ coursename: string }>;
  }
) => {
  await dbConnect();
  const { coursename } = await params;
  console.log(coursename);
  try {
    const course = await Course.findOne({ name: coursename });
    return NextResponse.json({ status: "okay", course });
  } catch (error) {
    console.error("Error", error);
    return NextResponse.json({ message: "something went wrong" });
  }
};

export { handler as GET };
