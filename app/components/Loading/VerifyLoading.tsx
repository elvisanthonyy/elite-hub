"use client";
import { FaLightbulb } from "react-icons/fa";

const VerifyLoading = () => {
  return (
    <div className="flex w-[50%] bg-white h-46 rounded-2xl justify-center items-center flex-col">
      <FaLightbulb className="text-5xl text-gray-200 loading-animation" />
      <div className="text-lg mt-6 font-semibold">Verifying</div>
    </div>
  );
};

export default VerifyLoading;
