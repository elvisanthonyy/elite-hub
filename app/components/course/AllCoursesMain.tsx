"use client";
import CourseComp from "./CourseComp";
import { ICourse } from "@/models/courses";

interface ChildProps {
  courses: ICourse[];
}

const AllCoursesMain = ({ courses }: ChildProps) => {
  return (
    <div className="flex flex-col items-center py-10 w-full mx-auto mt-27 bg-white h-dvh">
      <div className="flex flex-col items-center w-full">
        {courses?.map((course, index) => (
          <div className="flex w-[90%] mb-5" key={course._id.toString()}>
            <CourseComp name="allCourses" course={course} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCoursesMain;
