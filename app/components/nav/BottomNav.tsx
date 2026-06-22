import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";

interface ChildProps {
  pageName: string;
}

const BottomNav = ({ pageName }: ChildProps) => {
  const router = useRouter();
  return (
    <div className="absolute flex items-center z-15 px-5 bg-white border-b-[0.1px] border-black-5 w-full left-0 top-[68px] h-[48px]">
      <IoArrowBack
        className="text-black-3 text-[20px] cursor-pointer mr-4"
        onClick={() => router.back()}
      />

      <div className="text-[16px] font-medium text-black-3">{pageName}</div>
    </div>
  );
};

export default BottomNav;
