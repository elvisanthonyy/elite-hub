import Link from "next/link";

interface ChildProps {
  isMenuOpen: boolean;
}
const Menu = ({ isMenuOpen }: ChildProps) => {
  return (
    <div
      className={`trasition-all ease-in-out duration-600 absolute grid pt-30 place-items-center  ${
        isMenuOpen
          ? "opacity-100 translate-y-0"
          : "-translate-y-1000 opacity-100"
      } z-15 flex top-0 left-0 h-dvh w-full bg-white`}
    >
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
  );
};

export default Menu;
