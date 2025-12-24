import getSession from "@/libs/getSession";
import { redirect } from "next/navigation";
import dbConnect from "@/libs/dbConnect";
import NavBar from "@/app/components/nav/NavBar";
import PaymentMain from "@/app/components/payment/PaymentMain";
import { cookies } from "next/headers";

const baseURL = process.env.BASE_URL;

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
  const cookieStore = cookies();
  const session = await getSession();

  if (!session) {
    redirect(`/auth/login?redirectUrl=${paramBody.coursename}/payment`);
  }

  const req = await fetch(`${baseURL}/api//one/course/${paramBody.coursename}`);
  const data = await req.json();

  //to get user from data base
  const userRes = await fetch(`${baseURL}/api/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: (await cookieStore).toString(),
    },
  });
  const userData = await userRes.json();
  return (
    <div>
      <NavBar />
      <PaymentMain user={userData.user} course={data.course} />
    </div>
  );
};

export default page;
