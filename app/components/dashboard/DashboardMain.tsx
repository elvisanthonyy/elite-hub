"use client";
import { IUserCourse } from "@/models/user";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ChildProps {
  user: {
    name: string;
    email: string;
    courses: IUserCourse[];
  };
}
const DashboardMain = ({ user }: ChildProps) => {
  const router = useRouter();
  const [paidCourses, setPaidCourses] = useState<IUserCourse[] | []>([]);

  useEffect(() => {
    setPaidCourses(user?.courses.filter((it: IUserCourse) => it.paid === true));
  }, []);
  return (
    <div className="w-full flex flex-col min-h-dvh">
      <div className="relative mt-25 overflow-hidden p-5 py-7 mx-auto rounded-2xl w-[90%] h-70 bg-linear-to-br  from-blue-800 to-blue-500">
        <div className="text-white text-xl">
          {`Welcome, ${user?.name?.split(" ")[0]}`}
        </div>
        <div className="flex flex-col justify-center w-full h-30 p-3 border border-white/20 bg-white/20 rounded-lg my-5">
          <div className="flex mb-2 text-white">
            <div className="mr-2 font-semibold text-gray-100">
              Paid Courses:
            </div>
            <div>{paidCourses.length}</div>
          </div>
          <div
            onClick={() => router.push("/my/courses")}
            className="flex cursor-pointer font-semibold text-gray-100 "
          >
            <div className="mr-2">All Courses:</div>
            <div>{user.courses.length}</div>
          </div>
        </div>
        <div className="w-full flex justify-between items-center">
          <button
            onClick={() => router.push("/course/all")}
            className="w-[60%] text-sm cursor-pointer rounded-lg h-10 flex justify-center items-center text-black bg-white"
          >
            Add Courses
          </button>
          <div className="border w-[35%] border-white/20 bg-white/20  flex text-xl justify-center items-center h-10 text-white rounded-lg">
            {user.courses.length > 0 ? user.courses.length : "0"}
          </div>
        </div>
      </div>
      <div className="w-[90%] h-35 bg-white rounded-2xl mt-5 mx-auto"></div>
      <div className="flex items-center mt-5 justify-between w-[90%] mx-auto">
        <div className="w-[48%] h-70 bg-white rounded-2xl"></div>
        <div className="w-[48%] h-70 bg-white rounded-2xl"></div>
      </div>
    </div>
  );
};

export default DashboardMain;
