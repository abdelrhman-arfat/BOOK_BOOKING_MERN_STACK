import React from "react";
import UserInfo from "../ui/UserInfo";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="w-screen h-[90px] ">
      <nav className="w-[90%] h-full flex items-center justify-between mx-auto ">
        <Link className="text-2xl" href={"/"}>
          Book <span className="text-sm">hub</span>
        </Link>

        <div>
          <UserInfo />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
