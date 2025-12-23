"use client";
import MyCoursesComp from "./MyCoursesComp";
import { IUserCourse } from "@/models/userCourse";
import { ICourse } from "@/models/courses";

export interface Course {
  courseId: ICourse;
  userCourseId: IUserCourse;
  courseName: string;
}

interface ChildProps {
  myCourses: Course[];
}

const MyCoursesMain = ({ myCourses }: ChildProps) => {
  console.log(myCourses);
  return (
    <div className="flex flex-col items-center py-10 w-full mx-auto mt-27 bg-white h-dvh">
      {myCourses?.map((myCourse, index) => (
        <div
          className="w-[87%] mx-auto"
          key={myCourse?.courseId._id.toString()}
        >
          <MyCoursesComp index={index} myCourse={myCourse} />
        </div>
      ))}
    </div>
  );
};

export default MyCoursesMain;
