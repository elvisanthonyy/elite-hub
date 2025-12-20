"use client";
import { useRouter } from "next/navigation";
import { MdChevronLeft } from "react-icons/md";

const BackButton = () => {
  const router = useRouter();

  return (
    <div className="cursor-pointer" onClick={() => router.back()}>
      <MdChevronLeft className="text-3xl" />
    </div>
  );
};

export default BackButton;
