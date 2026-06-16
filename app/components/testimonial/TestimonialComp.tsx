import React from "react";

interface ChildProps {
  name: string;
}

const TestimonialComp = ({ name }: ChildProps) => {
  return (
    <div className=" relative border-[0.7px] border-white-3 flex flex-col px-5 py-5 justify-between shrink-0 w-[336px] mr-2 rounded-md bg-white h-[236px]">
      <div className="flex w-full items-center justify-between font-semibold text-[18px] text-gray-800">
        {name}
        <div className="h-12 aspect-square rounded-full bg-primary-3"></div>
      </div>
      <div className="text-sm">
        The course was very practical and I was able to go from a beginner to a
        pro, The course was very practical and I was able to go from a beginner
        to a pro, Thank you
      </div>
      <div></div>
    </div>
  );
};

export default TestimonialComp;
