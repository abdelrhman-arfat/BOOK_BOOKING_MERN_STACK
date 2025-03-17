import { userRoles } from "@/app/constant/userRoles";
import { TUser } from "@/app/types/User";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { CiSettings } from "react-icons/ci";
import Loader from "../loaders/Loader";
import { BiHeart, BiHome } from "react-icons/bi";
import LogOutBtn from "../btns/LogOutBtn";

const UserOption = ({
  loginUser,
}: {
  loginUser: {
    user?: TUser;
    isAuthenticated: boolean;
  };
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      {isLoading && <Loader />}
      <div className="flex relative gap-2 items-center">
        <p className="sm:text-xl font-semibold">
          Welcome, {loginUser?.user?.firstName}
        </p>
        <div>
          <Image
            onClick={() => {
              setIsOpen((p: boolean) => !p);
            }}
            className="rounded-full"
            priority
            src={
              loginUser?.user?.profilePicture ||
              "https://res.cloudinary.com/dannuv9wj/image/upload/v1741880998/vzwbk2akc3gbwcu9wrws.jpg"
            }
            alt="UserImage"
            width={50}
            height={50}
          ></Image>
        </div>
        {isOpen && (
          <div className="absolute z-[40000] text-start min-w-[200px] top-12 right-0 bg-white rounded-lg p-2 flex flex-col gap-2 shadow-md">
            {loginUser?.user &&
              [
                userRoles.ADMIN,
                userRoles.SUPERADMIN,
                userRoles.LEADER,
              ].includes(loginUser?.user?.role) && (
                <Link
                  className="w-full hover:bg-gray-100 py-1 duration-300 text-[16px] text-center"
                  href={"/admin/products"}
                >
                  Admin
                </Link>
              )}
            <Link
              className="w-full  hover:bg-gray-100 py-1 duration-300 text-2xl  "
              href={"/"}
            >
              <BiHome className="mx-auto" />
            </Link>
            {loginUser.isAuthenticated && (
              <Link
                className="w-full hover:bg-gray-100 py-1 duration-300 text-2xl  "
                href={"/profile"}
              >
                <CiSettings className="mx-auto" />
              </Link>
            )}
            <Link
              className="w-full flex items-center gap-3 hover:bg-gray-100 py-1 duration-300 text-2xl  "
              href={"/fav"}
            >
              <BiHeart className="mx-auto text-red-400 " />
            </Link>

            <LogOutBtn setIsLoading={setIsLoading} />
          </div>
        )}
      </div>
    </>
  );
};

export default UserOption;
