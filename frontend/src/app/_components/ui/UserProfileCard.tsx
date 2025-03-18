"use client";

import { app } from "@/app/Api/axiosInstance";
import useUserSelector from "@/app/hooks/AppSelectors";
import Image from "next/image";
import Swal from "sweetalert2";

const UserProfileCard = () => {
  const userLogin = useUserSelector();

  if (!userLogin.isAuthenticated) {
    return (
      <div className="w-full flex-col gap-3 h-full centered">
        <h1 className="text-2xl">Please Login</h1>
      </div>
    );
  }
  return (
    <div className="w-full h-full px-3 sm:px-10 py-10">
      <div className="relative w-[100px] h-[100px] my-3 rounded-full">
        <Image
          fill
          src={userLogin?.user?.profilePicture || ""}
          alt="userImage"
        ></Image>
      </div>
      <div className="flex flex-col gap-2 ">
        <h1 className="text-2xl font-bold">
          Name :{userLogin.user?.firstName} {userLogin.user?.lastName}
        </h1>
        <h2 className="text-xl font-semibold">
          Email : {userLogin.user?.email}
        </h2>
      </div>

      <div className="mt-10">
        <button
          onClick={async () => {
            const { value } = await Swal.fire({
              title: "Enter your credentials",
              html: `
                <input type="password" required id="swal-oldPassword" class="swal2-input" placeholder="Old your Password">
                <input type="password" required id="swal-newPassword" class="swal2-input" placeholder="New your Password">
              `,
              focusConfirm: false,
              showCancelButton: true,
              preConfirm: () => {
                const oldPassword = (
                  document.getElementById(
                    "swal-oldPassword"
                  ) as HTMLInputElement
                ).value;
                const newPassword = (
                  document.getElementById(
                    "swal-newPassword"
                  ) as HTMLInputElement
                ).value;

                if (!newPassword || !oldPassword) {
                  Swal.showValidationMessage("Please enter both passwords.");
                  return false;
                }

                return { newPassword, oldPassword };
              },
            });

            if (value) {
              const res = await app.post("users/change-password", {
                email: userLogin.user?.email,
                oldPassword: value.oldPassword,
                newPassword: value.newPassword,
              });
              if (res.status !== 200) {
                Swal.fire({
                  title: "Failed to change password",
                  text:
                    res.data.message ||
                    "Failed to change password. Please try again.",
                  icon: "error",
                  draggable: false,
                });
                return;
              }
              Swal.fire({
                title: "Changed Successfully",
                text: "Password Change Successfully.",
                icon: "success",
                draggable: true,
              });
            }
          }}
          className="px-4 rounded-2xl py-2 bg-neutral-400 text-white"
        >
          Change Password
        </button>
        <button
          onClick={() => {
            Swal.fire({
              title: "Do you want to delete your account?",
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: "Yes",
              denyButtonText: `No`,
            }).then(async (result) => {
              if (result.isConfirmed) {
                const res = await app.delete(`users/${userLogin?.user?._id}`);
                if (res.status !== 200) {
                  Swal.fire({
                    title: "Failed to delete account",
                    text:
                      res.data.message ||
                      "Failed to delete account. Please try again.",
                    icon: "error",
                    draggable: false,
                  });
                  return;
                }
                Swal.fire({
                  title: "Deleted Successfully",
                  text: "Account deleted successfully.",
                  icon: "success",
                  draggable: true,
                  timer: 1500,
                  timerProgressBar: true,
                });
              } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
              }
            });
          }}
        >
          Delete My Account
        </button>
      </div>
    </div>
  );
};

export default UserProfileCard;
