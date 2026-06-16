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
      className={`cursor-pointer w-[246px] bg-white border border-[0.7px] border-white-3 relative flex flex-col overflow-hidden shrink-0 h-[322px] mr-1 rounded-[8px]`}
    >
      <div className="h-[144px] w-[384px] mb-2 bg-secondary-3"></div>
      <div className="px-[18px] pb-4">
        <div className="font-semibold text-[16px] text-black">
          {mainCourseName}
        </div>
        <div className="mt-2 text-xs border-t border-white-3 py-2 text-black-5 text-gray-950">
          {course?.description}
        </div>
        <div className="w-full mt-2 flex justify-end">
          <div className="flex w-fit text-[14px] rounded-[4px] bg-primary-2 text-white-1 px-8 py-[12px]">
            Eroll
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseComp;
