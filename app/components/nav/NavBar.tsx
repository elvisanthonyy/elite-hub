"use client";
import { useEffect, useState } from "react";
import Menu from "../course/Menu";
import { useRouter } from "next/navigation";
import Image from "next/image";
import BackButton from "../BackButton";

interface ChildProps {
  name?: string;
}

const NavBar = ({ name }: ChildProps) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="flex z-20 bg-red-400 h-auto w-full absolute top-0 ">
      <Menu isMenuOpen={isMenuOpen} />
      <div className="absolute z-30 flex left-[50%] -translate-x-[50%] top-7 items-center justify-between rounded-4xl left px-8 w-[90%] h-16 bg-white">
        {name === "home" && (
          <div className="flex items-center">
            <div className="flex mb-1 mr-2 justify-start items-center">
              <Image
                src={"/elite_logo.svg"}
                alt="logo"
                height={40}
                width={40}
              />
            </div>
            <div className="text-lg font-semibold">Elite Hub</div>
          </div>
        )}
        {name !== "home" && <BackButton />}
        <div
          onClick={() =>
            isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true)
          }
          className="flex z-30  cursor-pointer flex-col justify-center items-center w-10 h-auto "
        >
          <span
            className={`transition-all ease-in w-5 m-1 ${
              isMenuOpen ? "-rotate-45 translate-y-1" : ""
            } rounded-2xl h-0.5 bg-black block`}
          ></span>
          <span
            className={`transition-all ease-in w-5 mb-1 ${
              isMenuOpen ? "opacity-0" : ""
            } rounded-2xl h-0.5 bg-black block`}
          ></span>
          <span
            className={`transition-all ease-in w-5 mb-1 ${
              isMenuOpen ? "rotate-45 -translate-y-2" : ""
            } rounded-2xl h-0.5 bg-black block`}
          ></span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
