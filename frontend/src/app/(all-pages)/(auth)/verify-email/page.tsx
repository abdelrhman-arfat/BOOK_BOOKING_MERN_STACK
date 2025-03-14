"use client";
import { app } from "@/app/Api/axiosInstance";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
const Page = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [message, setMessage] = useState("Verifying...");
  useEffect(() => {
    if (!token) {
      return;
    }
    app
      .patch(`/users/verify-email?token=${token}`)
      .then((res) => {
        console.log(res);
        setMessage(res.data.message);
      })
      .catch(() => {
        setMessage("Failed to verify email. Please try again.");
      });
  }, [token]);

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col gap-3 ">
      <h1 className="text-2xl text-green-500 bg-gray-200 px-3 py-2">{message}</h1>
      <Link href={"/"} className="btn bg-blue-500 text-white " replace>Home</Link>
    </div>
  );
};

export default Page;
