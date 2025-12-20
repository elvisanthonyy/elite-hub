import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import { Course } from "@/models/courses";

const handler = async () => {
  await dbConnect();
  try {
    const courses = await Course.find();
    return NextResponse.json({ message: "gotten", courses });
  } catch (error) {
    console.error("Error", error);
    return NextResponse.json({ message: "somethint went wrong" });
  }
};

export { handler as GET };
