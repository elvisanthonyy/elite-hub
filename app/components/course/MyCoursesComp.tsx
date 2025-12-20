"use client";
import { Course } from "./MyCoursesMain";
import { FaCheck } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface ChildProps {
  myCourse: Course;
  index: number;
}

const MyCoursesComp = ({ myCourse, index }: ChildProps) => {
  const router = useRouter();

  const splitName = myCourse.courseName.split("");
  const mainCourseName = [
    ...splitName[0].toUpperCase(),
    ...splitName.filter((it, index) => index !== 0),
  ].join("");

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
      className={`flex p-5 text-white justify-between mb-5 w-full h-35 rounded-2xl bg-linear-to-br ${mainColor}`}
    >
      <div className=" h-full flex flex-col">
        <div className="text-xl mb-5 font-bold">{mainCourseName}</div>

        {!myCourse.paid ? (
          <button
            onClick={() => router.push(`/${myCourse.courseName}/payment`)}
            className="cursor-pointer w-20 h-10 mt-auto bg-white text-black text-sm rounded-lg"
          >
            Pay
          </button>
        ) : (
          <button className="cursor-pointer w-20 h-10 mt-auto bg-white text-black text-sm rounded-lg">
            View
          </button>
        )}
      </div>
      <div
        className={`bg-white mt-auto rounded-4xl w-10 h-10 flex text-xs justify-center items-center ${
          myCourse.paid ? "text-green-600" : "text-red-600"
        } `}
      >
        {myCourse.paid ? <FaCheck /> : <FiX className="text-xl" />}
      </div>
    </div>
  );
};

export default MyCoursesComp;
