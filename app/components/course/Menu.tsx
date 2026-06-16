import Link from "next/link";

interface ChildProps {
  isMenuOpen: boolean;
}
const Menu = ({ isMenuOpen }: ChildProps) => {
  return (
    <div
      className={`trasition-all px-8 py-16 ease-in-out duration-600 absolute justift-between flex flex-col py-5  ${
        isMenuOpen
          ? "opacity-100 translate-x-0"
          : "-translate-x-1000 opacity-100"
      } z-15 flex top-16 text-xl font-semibold text-gray-900 h-dvh w-[80%] left-0 bg-white`}
    >
      <div className="grid text-black-5 text-[18px] gap-y h-[80%]">
        <Link href={"/"}>
          <div>Home</div>
        </Link>
        <Link href={"/dashboard"}>
          <div>Dashboard</div>
        </Link>
        <Link href={"/profile"}>
          <div>Profile</div>
        </Link>
        <Link href={"/my/courses"}>
          <div>My Courses</div>
        </Link>
        <div>About</div>
      </div>
      <button className="bg-primary-3 text-white-2 text-[16px] font-bold rounded-[40px] px-16 py-4">
        Login
      </button>
    </div>
  );
};

export default Menu;
