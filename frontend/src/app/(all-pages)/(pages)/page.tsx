import AllBooksUsersPage from "@/app/_components/ui/AllBooksUsersPage";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const Page = () => {
  return (
    <div className="w-full px-4 sm:px-10">
      <div className="bg-neutral-100 min-h-[300px] my-6  flex flex-col items-center justify-center gap-3">
        <h1 className="text-3xl font-bold">All Books</h1>
        <p className="text-[18px] px-3 sm:text-xl text-center ">
          Here you can find all the books uploaded in several fields
        </p>
        <div className="flex gap-3 items-center">
          <p>developed by Abdo Yasser</p>
          <Link className="text-3xl hover:scale-110 duration-300" replace href={"https://github.com/abdelrhman-arfat/BOOK_BOOKING_MERN_STACK"}>
            <FaGithub />
          </Link>
        </div>
      </div>
      <AllBooksUsersPage />
    </div>
  );
};

export default Page;
