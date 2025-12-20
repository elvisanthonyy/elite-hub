"use client";
import { useState, useEffect } from "react";
import { ICourse } from "@/models/courses";
import { useRouter } from "next/navigation";
import api from "@/libs/api";
import { IUserCourse } from "@/models/user";

interface ChildProps {
  course: ICourse;
  user?: {
    _id: string;
    name: string;
    email: string;
    courses: IUserCourse[];
  };
}

const CourseMain = ({ course, user }: ChildProps) => {
  const router = useRouter();
  console.log(user);
  const [userError, setUserError] = useState("");
  const [inUser, setInUser] = useState(false);
  const addCourse = () => {
    if (!user) {
      setUserError("You must login to add courses");
      return;
    }

    api
      .post("/api/add/course", {
        userId: user?._id,
        courseId: course._id,
        courseName: course.name,
      })
      .then((res) => {
        if (res.data.message === "course added") {
          return setInUser(true);
        }
      })
      .catch((err) => {
        console.error("Error", err);
      });
  };

  useEffect(() => {
    const alreadyAddedByUser = user?.courses.find(
      (it: IUserCourse) => it.courseId === course._id.toString()
    );

    if (alreadyAddedByUser) {
      setInUser(true);
    }
  }, []);

  return (
    <div className="z-40 flex flex-col items-center mt-28 min-h-[90dvh] rounded-lg w-full bg-white mx-auto">
      <div className="mt-10 text-lg  font-bold text-gray-800">
        {course.name.toUpperCase()}
      </div>
      <div className="w-[90%] mb-10 mt-7 p-3  min-h-40">
        <div className="mb-2 font-bold text-gray-600">Description</div>
        <div className="text-sm">{course.description}</div>
        <div className="mt-4 font-bold text-gray-600">Skills to Learn</div>
        <ul className="mt-2 ">
          {course.skills.map((skill) => (
            <li key={skill} className="text-sm">
              * {skill}
            </li>
          ))}
        </ul>
        <div className="mt-4 font-bold text-gray-600">Requirements</div>
        <ul className="mt-2">
          {course.requirements.map((requirement) => (
            <li key={requirement} className="text-sm">
              * {requirement}
            </li>
          ))}
        </ul>
        <div className="mt-4 font-bold text-gray-600">Duration</div>
        <div>2 months</div>
        <div className="mt-4 font-bold text-gray-600">{`N${course.amount}`}</div>
      </div>

      {userError && (
        <div className="text-red-600 text-sm mb-5">{userError}</div>
      )}
      {userError && (
        <button
          onClick={() =>
            router.push(`/auth/login?redirectUrl=course/${course.name}`)
          }
          className="cursor-pointer bg-black rounded-lg w-[90%] h-12 text-white text-sm mb-5"
        >
          Login
        </button>
      )}

      {inUser ? (
        <button
          onClick={() => router.push(`/${course.name}/payment`)}
          className="cursor-pointer w-[90%] h-12 rounded-lg bg-linear-to-br from-blue-700 to-blue-500 text-white mt-auto mb-20 flex justify-center items-center"
        >
          Make Payment
        </button>
      ) : (
        <button
          onClick={addCourse}
          className="cursor-pointer w-[90%] h-12 rounded-lg bg-linear-to-br from-blue-700 to-blue-500 text-white mt-auto mb-20 flex justify-center items-center"
        >
          Add
        </button>
      )}
    </div>
  );
};

export default CourseMain;
