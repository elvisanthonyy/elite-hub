"use client";
import { useEffect, useState } from "react";
import Menu from "../course/Menu";
import { useRouter } from "next/navigation";
import Image from "next/image";
import BackButton from "../BackButton";
import BottomNav from "./BottomNav";

interface ChildProps {
  name?: string;
}

const NavBar = ({ name }: ChildProps) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="flex z-23 h-[64px] box-border w-full absolute top-0 ">
      <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <div className="absolute z-30 border-b-[0.5px] border-b-black-5 px-4 flex  items-center justify-between left w-full h-17 bg-white">
        <div className="flex items-center">
          <div className="flex mb-1 mr-2 justify-start items-center">
            <Image
              src={"/icons/elite-logo.svg"}
              alt="logo"
              height={40}
              width={40}
              className="w-[32px]"
            />
          </div>
          <div className="text-lg text-black-2 font-bold">Elite Hub</div>
        </div>

        {name !== "home" && <BottomNav />}
        <div
          onClick={() =>
            isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true)
          }
          className="flex z-30  cursor-pointer flex-col justify-center items-center w-10 h-auto "
        >
          <span
            className={`transition-all ease-in w-6 m-1 ${
              isMenuOpen ? "-rotate-45 translate-y-1" : ""
            } rounded-2xl h-0.5 bg-black-2 block`}
          ></span>
          <span
            className={`transition-all ease-in w-6 mb-1 ${
              isMenuOpen ? "opacity-0" : ""
            } rounded-2xl h-0.5 bg-black-2 block`}
          ></span>
          <span
            className={`transition-all rounded-xl ease-in w-6 mb-1 ${
              isMenuOpen ? "rotate-45 -translate-y-2" : ""
            } rounded-2xl h-0.5 bg-black-2 block`}
          ></span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
