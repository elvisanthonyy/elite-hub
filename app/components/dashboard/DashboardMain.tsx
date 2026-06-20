"use client";
import { Course } from "../course/MyCoursesMain";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ChildProps {
  user: {
    name: string;
    email: string;
    courses: Course[];
  };
}
const DashboardMain = ({ user }: ChildProps) => {
  const router = useRouter();
  const [paidCourses, setPaidCourses] = useState<Course[] | []>([]);

  useEffect(() => {
    //get paid courses
    setPaidCourses(
      user?.courses.filter(
        (it: Course) => it.userCourseId.paymentStatus === "paid",
      ),
    );
  }, []);
  return (
    <div className="w-full px-4 flex flex-col min-h-dvh">
      <div className="flex flex-col relative mt-22 overflow-hidden py-5 px-6 mx-auto rounded-2xl w-full h-70 bg-black-2">
        <div className="text-white text-[24px]">
          {`Welcome, ${user?.name?.split(" ")[0]}`}
        </div>
        <div className="flex text-[14px] z-22 items-center w-full mt-auto">
          <div className="flex border border-white-3 backdrop-blur-xl mr-3 mb-2 py-2 px-4 rounded-[32px] text-white bg-white/5">
            <div className="mr-4 text-gray-100">Paid Courses:</div>
            <div>{paidCourses?.length}</div>
          </div>
          <div
            onClick={() => router.push("/my/courses")}
            className="flex mb-2 border border-white-3 backdrop-blur-xl py-2 px-4 rounded-[32px] text-white bg-white/5 "
          >
            <div className="mr-2">All Courses:</div>
            <div>{user?.courses?.length}</div>
          </div>
        </div>
        <div className="w-[138px] aspect-square rounded-full bg-primary-3 z-10 blur-[50px] absolute -bottom-15 -right-12"></div>
      </div>
      <div className="absolute flex items-center bottom-8 right-4 p-4 bg-primary-3 text-white rounded-[8px]">
        <div className="w-[22px] aspect-square mr-3">
          <Image
            src={"/icons/plus-icon.svg"}
            height={1000}
            width={1000}
            draggable={true}
            alt="plus icon"
            className="w-full"
          />
        </div>{" "}
        Add course
      </div>
    </div>
  );
};

export default DashboardMain;
