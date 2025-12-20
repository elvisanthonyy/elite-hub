import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/libs/dbConnect";
import bcrypt from "bcryptjs";
import { User } from "@/models/user";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();
        if (!credentials?.email) {
          return null;
        }
        if (!credentials?.email || !credentials?.password) {
          console.log("send fields");
          throw new Error("field not complete");
        }

        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          console.log("user not found");
          throw new Error("user not found");
        }

        const checkPass = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!checkPass) {
          console.log("invalid email or password");
          throw new Error("invalid email or password");
        }

        if (!user.isVerified) {
          console.log("user not verified");
          throw new Error("user not verified");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          courses: user.courses,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  logger: {
    error(code, metadata) {
      console.log("NextAuth error", code, metadata);
    },
    warn(code) {
      console.log("NextAuth error", code);
    },
    debug(code, metadata) {
      console.log("NextAuth error", code, metadata);
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.courses = user.courses;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id && session) {
        const user = await User.findOne({ email: session.user.email });
        if (user) {
          session.user.id = token.id;
          session.user.courses = token.courses;
        }
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
