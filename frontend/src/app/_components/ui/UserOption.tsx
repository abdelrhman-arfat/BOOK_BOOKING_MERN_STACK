import { logout } from "@/app/_RTK/redux-slices/authSlice";
import { app } from "@/app/Api/axiosInstance";
import { userRoles } from "@/app/constant/userRoles";
import { useAppDispatch } from "@/app/hooks/AppDispatch";
import { TUser } from "@/app/types/User";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { CiSettings } from "react-icons/ci";
import { LuLogOut } from "react-icons/lu";
import Swal from "sweetalert2";
import Loader from "../loaders/Loader";

const UserOption = ({
  loginUser,
}: {
  loginUser: {
    user?: TUser;
    isAuthenticated: boolean;
  };
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      {isLoading && <Loader />}
      <div className="flex relative gap-2 items-center">
        <p className="text-xl font-semibold">
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
              className="w-full hover:bg-gray-100 py-1 duration-300 text-2xl  "
              href={"/profile"}
            >
              <CiSettings className="mx-auto" />
            </Link>

            <button
              onClick={() => {
                setIsLoading(true);
                app
                  .post("users/logout")
                  .then((res) => {
                    setIsLoading(false);

                    if (res.status !== 200) {
                      Swal.fire({
                        title: "Logout Failed",
                        text: "Failed to logout. Please try again.",
                        icon: "error",
                        draggable: false,
                      });
                      return;
                    }
                    dispatch(logout());
                  })
                  .catch(() => {
                    setIsLoading(false);
                    Swal.fire({
                      title: "Logout Failed",
                      text: "Failed to logout. Please try again.",
                      icon: "error",
                      draggable: false,
                    });
                  });
              }}
              className="w-full rounded-md h-[40px]  group flex items-center hover:scale-105 text-white bg-red-500 cursor-pointer px-2 py-1 duration-200 text-xl "
            >
              <LuLogOut className="group-hover:rotate-180 group-hover:translate-x-[150px]  duration-500" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default UserOption;
