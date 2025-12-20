import React from "react";
import SignUpMain from "../../components/signup/SignUpMain";
import Footer from "../../components/footer/Footer";

export const metadata = {
  title: "Sign Up for Free",
};

const page = () => {
  return (
    <div className="w-full h-dvh flex flex-col justify-center items-center">
      <SignUpMain />
      <Footer />
    </div>
  );
};

export default page;
