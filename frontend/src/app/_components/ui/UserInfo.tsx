"use client";
import useUserSelector from "@/app/hooks/AppSelectors";
import Link from "next/link";
import React from "react";
import UserOption from "./UserOption";

const UserInfo = () => {
  const loginUser = useUserSelector();
  return (
    <div>
      {loginUser && loginUser.isAuthenticated ? (
        <UserOption loginUser={loginUser} />
      ) : (
        <Link
          href={"/login"}
          className="px-4 rounded-2xl py-2 from-pink-500 text-white hover:scale-105 duration-300 to-pink-800 bg-gradient-to-r"
        >
          Sing-in
        </Link>
      )}
    </div>
  );
};

export default UserInfo;
