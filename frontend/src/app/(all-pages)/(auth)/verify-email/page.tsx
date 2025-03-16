"use client";
import { setCredentials } from "@/app/_RTK/redux-slices/authSlice";
import { app } from "@/app/Api/axiosInstance";
import { userRoles } from "@/app/constant/userRoles";
import { useAppDispatch } from "@/app/hooks/AppDispatch";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [message, setMessage] = useState("Verifying...");
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!token) {
      return;
    }
    app
      .patch(`/users/verify-email?token=${token}`)
      .then((res) => {
        if (res.status !== 200) {
          setMessage("Failed to verify email. Please try again.");
          Swal.fire({
            title: "Failed to verify email",
            text: "Failed to verify email. Please try again.",
            icon: "success",
            draggable: true,
          }).then(() => {
            router.replace("/login");
            return;
          });
        }

        console.log(res.data.data.results);
        setMessage(res.data.message);
        dispatch(setCredentials(res.data.data.results));

        if (
          [userRoles.ADMIN, userRoles.SUPERADMIN, userRoles.LEADER].includes(
            res.data.data.results.role
          )
        ) {
          router.replace("/admin/dashboard");
          return;
        }

        router.replace("/");
      })
      .catch(() => {
        setMessage("Failed to verify email. Please try again.");
      });
  }, [token, dispatch, router]);

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col gap-3 ">
      <h1 className="text-2xl text-green-500 bg-gray-200 px-3 py-2">
        {message}
      </h1>
    </div>
  );
};

export default Page;
