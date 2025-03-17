import Link from "next/link";
import ErrorCard from "../_components/ui/ErrorCard";

const page = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex items-center flex-col gap-2">
        <ErrorCard />

        <h2 className="text-xl sm:text-3xl">
          <span className="text-red-500 font-bold">404</span> | Not found page
        </h2>
        <Link
          replace
          className="px-2 py-1 bg-red-600 text-white rounded-md duration-500 "
          href={"/"}
        >
          Home
        </Link>
        <p className="text-[12px] sm:text-sm">
          This page not found in our services
        </p>
      </div>
    </div>
  );
};

export default page;
