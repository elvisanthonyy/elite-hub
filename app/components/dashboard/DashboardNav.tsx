"use client";
import { BiBadgeCheck } from "react-icons/bi";
import { HiBadgeCheck } from "react-icons/hi";
import { BiHomeAlt } from "react-icons/bi";
import Link from "next/link";

interface ChildProps {
  user: {
    name: string;
    email: string;
  };
}

const DashboardNav = ({ user }: ChildProps) => {
  return (
    <div className="w-full font-bold top-0 left-0 absolute h-20 px-[9%] flex justify-between items-center">
      <div className="flex items-center text-xl">
        {user?.name} <HiBadgeCheck className="ml-2 text-2xl text-green-500" />
      </div>

      <div className="flex justify-center items-center  text-white w-10 h-10 rounded-full bg-linear-to-br from-blue-700 to-blue-500">
        {user.name.split("")[0]}
      </div>
    </div>
  );
};

export default DashboardNav;
