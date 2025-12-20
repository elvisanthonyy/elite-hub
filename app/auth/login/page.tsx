import React from "react";
import LoginMain from "@/app/components/login/LoginMain";
import Footer from "../../components/footer/Footer";

export const metadata = {
  title: "Login to your account",
};

const page = () => {
  return (
    <div className="w-full h-dvh flex flex-col justify-center items-center">
      <LoginMain />
      <Footer />
    </div>
  );
};

export default page;
