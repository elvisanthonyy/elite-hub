import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { UserProvider } from "./context/UserContext";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Elite Hub",
  description: "Introducing youths to tech",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <UserProvider session={session}>
        <body className={`${inter.className} bg-background antialiased`}>
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
