import { getServerSession } from "next-auth";
import dbConnect from "./dbConnect";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function () {
  await dbConnect();
  return getServerSession(authOptions);
}
