import NavBar from "@/app/components/nav/NavBar";
import CourseMain from "@/app/components/course/CourseMain";
import { cookies } from "next/headers";
import dbConnect from "@/libs/dbConnect";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ coursename: string }>;
}) {
  const paramBody = await params;
  return {
    title: `${paramBody.coursename}`,
  };
}

const baseURL = process.env.BASE_URL;

const page = async ({
  params,
}: {
  params: Promise<{ coursename: string }>;
}) => {
  //get cookies
  const cookieStore = cookies();
  await dbConnect();
  const paramBody = await params;

  const req = await fetch(`${baseURL}/api//one/course/${paramBody.coursename}`);
  const data = await req.json();

  const userRes = await fetch(`${baseURL}/api/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: (await cookieStore).toString(),
    },
  });
  const userData = await userRes.json();
  console.log(userData);
  return (
    <div className="">
      <CourseMain user={userData?.user} course={data.course} />
      <NavBar />
    </div>
  );
};

export default page;
