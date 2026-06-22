"use client";
import Link from "next/link";
import Image from "next/image";

const notFound = () => {
  return (
    <div className="w-full flex flex-col h-dvh flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-y-4 text-black-5">
        <div>
          <Image
            src="/icons/elite-logo.svg"
            alt="404"
            width={1000}
            height={1000}
            className="w-[100px] h-[100px] opacity-50"
          />{" "}
        </div>
        <div className="text-[24px] font-bold">404 Page not found</div>
      </div>
      <Link href="/" className="text-primary-3 mt-4 flex hover:underline">
        Home
      </Link>
    </div>
  );
};

export default notFound;
