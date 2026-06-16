import React from "react";

interface ChildProps {
  name: string;
}

const TestimonialComp = ({ name }: ChildProps) => {
  return (
    <div className=" relative border-[0.7px] border-white-3 flex flex-col px-5 py-5  shrink-0 w-[336px] mr-2 rounded-md bg-white h-[236px]">
      <div className="pb-5 font-semibold text-xl text-gray-800">{name}</div>
      <div className="text-sm">
        This class was awesome and I was able to build my first site
      </div>
      <button className="absolute text-xs bottom-5 left-5 w-40 h-10 text-white rounded-lg px-2 bg-black">
        Project Link
      </button>
    </div>
  );
};

export default TestimonialComp;
