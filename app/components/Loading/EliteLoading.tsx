"use client";
import Image from "next/image";

const EliteLoading = () => {
  return (
    <div>
      {" "}
      <div className="h-10 aspect-square flex justify-center items-center ">
        <Image
          src={"/icons/elite-logo.svg"}
          width={1000}
          height={1000}
          alt="elite logo"
          className="w-full loading-animation"
          draggable={false}
        />
      </div>
    </div>
  );
};

export default EliteLoading;
