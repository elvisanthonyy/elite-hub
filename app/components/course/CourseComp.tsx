"use client";
import { useRouter } from "next/navigation";
import { ICourse } from "@/models/courses";

interface ChildProps {
  index: number;
  course: ICourse;
  name?: string;
}

const CourseComp = ({ index, course, name }: ChildProps) => {
  const router = useRouter();

  //capitalize first letter of title
  const splitName = course.name.split("");
  const mainCourseName = [
    ...splitName[0].toUpperCase(),
    ...splitName.filter((it, index) => index !== 0),
  ].join("");

  //pick color for card
  let mainColor;
  if (index === 0) {
    mainColor = "from-green-400 to-green-300";
  } else if (index === 1) {
    mainColor = "from-blue-400 to-blue-300";
  } else {
    mainColor = "from-purple-400 to-purple-300";
  }

  return (
    <div
      onClick={() => router.push(`/course/${course?.name.toLocaleLowerCase()}`)}
      className={`cursor-pointer relative p-5 flex flex-col overflow-hidden shrink-0 ${
        name === "allCourses" ? "w-full" : "w-70"
      }  h-60 mr-2 rounded-2xl aspect-6/5 bg-linear-to-br ${mainColor} `}
    >
      <div className="font-semibold text-white">{mainCourseName}</div>
      <div className="mt-5 text-xs text-gray-50">{course?.description}</div>
      <div className="flex pb-8 pr-2 text-xl items-center justify-center w-40 h-40 bg-white rounded-full -bottom-12 absolute -right-7">
        {`₦${course?.amount}`}
      </div>
    </div>
  );
};

export default CourseComp;
