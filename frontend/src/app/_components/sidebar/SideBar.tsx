"use client";

import Link from "next/link";
import { useState } from "react";
import { BiMenu } from "react-icons/bi";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="fixed top-0 left-0 z-50">
      <button
        className="fixed text-3xl md:opacity-0 bottom-3 right-3 z-50 w-[40px] h-[40px] rounded-full centered shadow-md bg-gray-100"
        aria-label="menu"
        onClick={() => setIsOpen((p: boolean) => !p)}
      >
        <BiMenu />
      </button>
      <div
        className={`absolute bg-white w-[180px] z-40 ${
          isOpen ? "-translate-x-0" : "-translate-x-[200px]"
        } md:translate-x-0 duration-300 h-screen border-r  `}
      >
        <div>
          <h1 className="centered py-3 bg-purple-700 text-center text-white duration-300 shadow-sm">
            Logo
          </h1>
        </div>
        <div className="py-0.5 px-1 mt-1 flex flex-col gap-2 sidebar-parent">
          <Link href={"/admin/products"} className="">
            Products
          </Link>
          <Link href={"/admin/users"} className="">
            Users
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
