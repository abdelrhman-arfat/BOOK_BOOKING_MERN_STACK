import { logout } from "@/app/_RTK/redux-slices/authSlice";
import { userData } from "@/app/_RTK/RTK-query/query";
import { app } from "@/app/Api/axiosInstance";
import { useAppDispatch } from "@/app/hooks/AppDispatch";
import React, { SetStateAction } from "react";
import { LuLogOut } from "react-icons/lu";
import Swal from "sweetalert2";

const LogOutBtn = ({
  setIsLoading,
}: {
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();

  return (
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
            dispatch(userData.util.invalidateTags(["Users", "Favorites"]));
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
  );
};

export default LogOutBtn;
