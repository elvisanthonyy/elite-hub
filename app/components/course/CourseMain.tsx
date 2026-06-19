"use client";
import { useState, useEffect } from "react";
import { ICourse } from "@/models/courses";
import { useRouter } from "next/navigation";
import api from "@/libs/api";
import ButtonLoading from "../Loading/ButtonLoading";
import { Course } from "./MyCoursesMain";

interface ChildProps {
  course: ICourse;
  user?: {
    _id: string;
    name: string;
    email: string;
    courses: Course[];
  };
}

const CourseMain = ({ course, user }: ChildProps) => {
  const router = useRouter();
  const [userError, setUserError] = useState("");
  const [inUser, setInUser] = useState(false);
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(false);

  const addCourse = () => {
    setLoading(true);
    if (!user) {
      setLoading(false);
      setUserError("You must login to add courses");
      return;
    }

    api
      .post("/api/add/course", {
        userId: user?._id,
        courseId: course._id,
        courseName: course.name,
        courseAmoun: course.amount,
      })
      .then((res) => {
        setLoading(false);
        if (res.data.message === "course added") {
          return setInUser(true);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error", err);
      });
  };

  useEffect(() => {
    const alreadyAddedByUser = user?.courses.find(
      (it: Course) => it.courseId._id.toString() === course._id.toString(),
    );

    if (!alreadyAddedByUser) {
      return;
    }

    const isPaid = alreadyAddedByUser.userCourseId?.paymentStatus === "paid";

    if (alreadyAddedByUser && isPaid) {
      setInUser(true);
      setPaid(true);
    } else {
      setInUser(true);
    }

    //check if user has paid for course
  }, []);

  return (
    <div className="z-40 flex mt-8 flex-col items-center min-h-[90dvh] rounded-lg w-full px-4">
      <div className="w-full">
        <div className="flex mb-3 items-center justify-between w-full">
          <div className="mt-30 text-[28px] font-bold text-black-2">
            {course.name.toUpperCase()}
          </div>
          <div className="mt-30 text-[18px]  font-bold text-black-4">
            {course.amount}
          </div>
        </div>
        <div>
          <div className="text-[16px] mb-6 font-regular text-black-5">
            {course.description}
          </div>
        </div>
        {inUser ? (
          !paid ? (
            <button
              onClick={() => router.push(`/${course.name}/payment`)}
              className="cursor-pointer w-full py-5 rounded-[16px] bg-linear-to-br from-blue-700 to-blue-500 text-white flex justify-center items-center"
            >
              Make Payment
            </button>
          ) : (
            <button className="cursor-pointer w-full py-5 rounded-[16px] bg-linear-to-br from-blue-700 to-blue-500 text-white flex justify-center items-center">
              View course
            </button>
          )
        ) : (
          <button
            onClick={addCourse}
            className="cursor-pointer w-full py-5 rounded-[16px] bg-linear-to-br from-blue-700 to-blue-500 text-white flex justify-center items-center"
          >
            {loading ? <ButtonLoading /> : "Add"}
          </button>
        )}
      </div>

      <div className="w-full border-t-[0.3px] border-black-5 mb-10 mt-8 min-h-40">
        <div className="mt-3 font-bold text-[18px] text-black-2">
          Skills to Learn
        </div>
        <ul className="mt-2 ">
          {course.skills.map((skill) => (
            <li key={skill} className="text-[16px] text-black-5">
              {skill}
            </li>
          ))}
        </ul>
        <div className="mt-3 font-bold text-[18px] text-black-2">
          Requirements
        </div>
        <ul className="mt-2">
          {course.requirements.map((requirement) => (
            <li key={requirement} className="text-[16px] text-black-5">
              {requirement}
            </li>
          ))}
        </ul>
        <div className="mt-3 font-bold text-[18px] text-black-2">Duration</div>
        <div className="text-[16px] text-black-5">2 months</div>
      </div>
    </div>
  );
};

export default CourseMain;
