import getSession from "@/libs/getSession";
import { redirect } from "next/navigation";
import dbConnect from "@/libs/dbConnect";
import NavBar from "@/app/components/nav/NavBar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ coursename: string }>;
}) {
  const paramBody = await params;
  return {
    title: `Payment for ${paramBody?.coursename} course`,
  };
}

const page = async ({
  params,
}: {
  params: Promise<{ coursename: string }>;
}) => {
  await dbConnect();
  const paramBody = await params;
  const session = await getSession();

  if (!session) {
    redirect(`/auth/login?redirectUrl=${paramBody.coursename}/payment`);
  }
  return (
    <div>
      <NavBar />
    </div>
  );
};

export default page;
