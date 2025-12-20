import { redirect } from "next/navigation";
import dbConnect from "@/libs/dbConnect";
import getSession from "@/libs/getSession";
import NavBar from "@/app/components/nav/NavBar";
import { cookies } from "next/headers";
import MyCoursesMain from "@/app/components/course/MyCoursesMain";

export const metadata = {
  title: "My Courses",
};

const baseURL = process.env.BASE_URL;

const page = async () => {
  await dbConnect();
  const cookieStore = cookies();
  const session = await getSession();

  if (!session) {
    return redirect("/auth/login?redirectUrl=my/courses");
  }

  const res = await fetch(`${baseURL}/api/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: (await cookieStore).toString(),
    },
  });
  const data = await res.json();
  return (
    <div>
      <NavBar name="myCourses" />
      <MyCoursesMain myCourses={data.user.courses} />
    </div>
  );
};

export default page;
