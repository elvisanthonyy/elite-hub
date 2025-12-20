import VerifyMain from "@/app/components/signup/VerifyMain";

export const metadata = {
  title: "Verify Your account",
};

const baseURL = process.env.BASE_URL;

type SearchParams = {
  [key: string]: string | string[] | undefined;
};

const page = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const sp = await searchParams;

  return (
    <div className="w-full h-dvh flex justify-center items-center">
      <VerifyMain token={sp.token} />
    </div>
  );
};

export default page;
