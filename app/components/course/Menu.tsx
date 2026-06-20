import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/app/context/UserContext";

interface ChildProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Menu = ({ isMenuOpen, setIsMenuOpen }: ChildProps) => {
  const { session } = useUser();
  return (
    <div
      onClick={() => setIsMenuOpen(false)}
      className={`trasition-all  ease-in-out duration-600 absolute   ${
        isMenuOpen
          ? "opacity-100 translate-x-0"
          : "-translate-x-1000 opacity-100"
      } z-31 flex text-xl font-semibold bg-black/50 text-gray-900 h-dvh w-full left-0 `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col px-6 py-16 pt-20 bg-white w-[80%]"
      >
        <div className="w-full border-b py-2 border-black-5 mb-4 grid grid-cols-[max-content_max-content_max-content] gap-x-4 place-items-center justify-items-start ">
          <div className="w-[52px] overflow-hidden aspect-square border-2 border-black-4 rounded-full">
            <Image
              src={"/icons/sample-profile-large.jpg"}
              alt="Home"
              height={1000}
              width={1000}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-[18px] text-black-3">
            {session?.user?.name || "Guest"}
          </div>
          <div className="w-[18px] aspect-square mr-4">
            <Image
              src={"/icons/verify.svg"}
              alt="Home"
              height={1000}
              width={1000}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="w-full  h-full flex flex-col justify-between">
          <div className="grid text-black-5 text-[16px] gap-y h-[60%]">
            <div className="flex items-center justify-start">
              <div className="w-[17px] aspect-square mr-4">
                <Image
                  src={"/icons/home.svg"}
                  alt="Home"
                  height={1000}
                  width={1000}
                  className="w-full h-full object-cover"
                />
              </div>
              <Link href={"/"}>
                <div>Home</div>
              </Link>
            </div>
            <div className="flex items-center justify-start">
              <div className="w-[17px] aspect-square mr-4">
                <Image
                  src={"/icons/profile.svg"}
                  alt="Dashboard"
                  height={1000}
                  width={1000}
                  className="w-full h-full object-cover"
                />
              </div>
              <Link href={"/profile"}>
                <div>Profile</div>
              </Link>
            </div>
            <div className="flex items-center justify-start">
              <div className="w-[17px] aspect-square mr-4">
                <Image
                  src={"/icons/dashboard.svg"}
                  alt="Dashboard"
                  height={1000}
                  width={1000}
                  className="w-full h-full object-cover"
                />
              </div>
              <Link href={"/dashboard"}>
                <div>Dashboard</div>
              </Link>
            </div>

            <div className="flex items-center justify-start">
              <div className="w-[17px] aspect-square mr-4">
                <Image
                  src={"/icons/course.svg"}
                  alt="Dashboard"
                  height={1000}
                  width={1000}
                  className="w-full h-full object-cover"
                />
              </div>
              <Link href={"/my/courses"}>
                <div>My Courses</div>
              </Link>
            </div>
          </div>
          {!session && (
            <Link className="w-full cursor-pointer" href={"/auth/login"}>
              <button className="bg-black-2 text-white-2 text-[16px] w-full font-bold rounded-[40px] px-16 py-4">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
