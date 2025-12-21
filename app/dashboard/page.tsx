import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import DashboardNav from "../components/dashboard/DashboardNav";
import DashboardMain from "../components/dashboard/DashboardMain";
import { cookies } from "next/headers";
import dbConnect from "@/libs/dbConnect";

export const metadata = {
  title: "Dashboard",
};

const baseURL = process.env.BASE_URL;

const page = async () => {
  await dbConnect();
  const cookieStore = cookies();
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/auth/login");
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
      <DashboardNav user={data.user} />
      <DashboardMain user={data.user} />
    </div>
  );
};

export default page;
