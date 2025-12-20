import NextAuth from "next-auth";
import { IUserCourse } from "@/models/user";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      courses: IUserCourse[];
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    courses: IUserCourse[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    role: string;
    courses: IUserCourse[];
  }
}
