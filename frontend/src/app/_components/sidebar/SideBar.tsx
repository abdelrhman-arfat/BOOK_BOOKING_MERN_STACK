"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BiHome, BiMenu } from "react-icons/bi";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const path = usePathname();
  const menu = [
    { label: "Products", href: "/admin/products" },
    { label: "Users", href: "/admin/users" },
  ];

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
          <Link
            className=" py-3 text-center w-full block  hover:bg-purple-700 hover:text-white duration-300"
            href={"/"}
          >
            <BiHome className="mx-auto" />
          </Link>
          {menu.map((item) => (
            <Link
              href={item.href}
              key={item.label}
              className={`${
                item.href === path ? "bg-purple-600 text-white" : ""
              } centered py-3 hover:bg-purple-700 text-center hover:text-white duration-300 shadow-sm`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
