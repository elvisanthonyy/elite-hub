"use client";
import { useRouter } from "next/navigation";
import { ICourse } from "@/models/courses";
import Image from "next/image";

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
      className={`cursor-pointer transition-all ease-in duration-500 hover:scale-105 hover:mx-4 w-[246px] bg-white border border-[0.7px] border-white-3 relative flex flex-col overflow-hidden shrink-0 h-[322px] mr-1 rounded-[8px]`}
    >
      <div className="h-[144px] overflow-hidden w-[384px] mb-2 bg-black-3">
        <Image
          src={"/images/course-image.jpg"}
          alt="course image"
          width={1000}
          height={1000}
          className="h-full object-cover"
        />
      </div>
      <div className="px-[18px] pb-4">
        <div className="flex w-full justify-between font-semibold text-[16px] text-black">
          <div>{mainCourseName}</div>

          <div className="w-[58px]">
            <Image
              src={"/icons/inter-card-logo.svg"}
              alt="course image"
              width={1000}
              height={1000}
              className="w-full object-cover"
            />
          </div>
        </div>
        <div className="mt-2 text-xs border-t border-white-3 py-2 text-black-5 text-gray-950">
          {course?.description}
        </div>
        <div className="w-full mt-2 flex justify-end">
          <div
            onClick={() =>
              router.push(`/course/${course?.name.toLocaleLowerCase()}`)
            }
            className="flex w-fit text-[14px] rounded-[8px] bg-primary-3 text-white-1 px-8 py-[8px]"
          >
            Enroll
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseComp;
