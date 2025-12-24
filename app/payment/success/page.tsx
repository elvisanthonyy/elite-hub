import PaymentVerifyMain from "@/app/components/payment/PaymentVerifyMain";
import { Suspense } from "react";

const page = () => {
  return (
    <div className="w-full h-dvh flex justify-center items-center">
      <Suspense>
        <PaymentVerifyMain />
      </Suspense>
    </div>
  );
};

export default page;
