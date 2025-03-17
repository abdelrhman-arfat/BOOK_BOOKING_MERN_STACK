"use client";

import Link from "next/link";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { app } from "@/app/Api/axiosInstance";
import { useAppDispatch } from "@/app/hooks/AppDispatch";
import { setCredentials } from "@/app/_RTK/redux-slices/authSlice";
import Loader from "../loaders/Loader";
import Swal from "sweetalert2";
import { userRoles } from "@/app/constant/userRoles";
const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>();

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await app.post("users/login", {
        email,
        password,
      });
      const data = await res.data.data;
      setIsLoading(false);
      if (!res.data.success) {
        Swal.fire({
          title: "Wrong",
          text: res.data.message || "Wrong, please try again",
          icon: "error",
          draggable: false,
        });
        return;
      }

      const user = data.results;

      if (!user) return;
      if (!user.isVerified) {
        Swal.fire({
          title: "Wrong",
          text: "Your account is not verified",
          icon: "error",
          draggable: false,
        }).then(() => {
          app.post(`users/send-verification-email/${user._id}`).then((res) => {
            Swal.fire({
              title: "Verification Email Sent",
              text: res?.data.message || "Verification Email Sent",
              icon: "success",
              draggable: false,
            });
          });
        });
        return;
      }
      dispatch(setCredentials(user));

      Swal.fire({
        title: "Login Success!",
        icon: "success",
        draggable: true,
      }).then(() => {
        if (user.role !== userRoles.USER) {
          Swal.fire({
            title: "Loading...",
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            didOpen: () => {
              Swal.showLoading();
            },
            timer: 1000,
          });

          router.replace("/admin/products");
          return;
        }

        Swal.fire({
          title: "Loading...",
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();
          },
          timer: 1000,
        });

        router.replace("/");
      });
    } catch (error) {
      setIsLoading(false);

      let errorMessage = "Something went wrong";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "message" in error
      ) {
        errorMessage = (error as { message: string }).message || "invalid data";
      }

      Swal.fire({
        title: "Wrong",
        text: errorMessage || "Something went wrong",
        icon: "error",
        draggable: false,
      });
    }

    // Handle authentication logic here
  };
  return (
    <section className="bg-gray-100  flex items-center justify-center min-h-screen px-6 py-8">
      {isLoading && <Loader />}
      <div className="w-full max-w-[380px] bg-white rounded-lg shadow dark:border   p-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-center">
          Login with Your account
        </h1>
        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-500 "
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              min={8}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400"
              placeholder="••••••••"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-start"></div>
            <Link
              href="#"
              className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sign in
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
