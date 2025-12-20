import AllCoursesMain from "@/app/components/course/AllCoursesMain";
import NavBar from "@/app/components/nav/NavBar";
import getSession from "@/libs/getSession";
import dbConnect from "@/libs/dbConnect";

export const metadata = {
  title: "All Courses",
};

const baseURL = process.env.BASE_URL;

const page = async () => {
  await dbConnect();
  const res = await fetch(`${baseURL}/api/course`);
  const data = await res.json();

  console.log(data);
  return (
    <div>
      <NavBar />
      <AllCoursesMain courses={data.courses} />
    </div>
  );
};

export default page;
