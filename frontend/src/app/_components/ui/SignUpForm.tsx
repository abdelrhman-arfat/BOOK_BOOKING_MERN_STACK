"use client";
import { setCredentials } from "@/app/_RTK/redux-slices/authSlice";
import { app } from "@/app/Api/axiosInstance";
import { useAppDispatch } from "@/app/hooks/AppDispatch";
import React, { FormEvent, useState } from "react";
import Loader from "../loaders/Loader";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const newUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData(e.currentTarget);
    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    const email = data.get("email");
    const password = data.get("password");
    const confirmPassword = data.get("confirmPassword");
    if (password !== confirmPassword) {
      setIsLoading(false);
      Swal.fire({
        title: "Password doesn't match",
        icon: "error",
        draggable: false,
      });
      return;
    }
    app
      .post("users/register", {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      })
      .then((res) => {
        setIsLoading(false);
        if (res.status !== 200) {
          Swal.fire({
            title: res.data.message,
            text: "Please try again",
            icon: "error",
            draggable: false,
          });
        }
        dispatch(setCredentials(res.data.data.results));
        Swal.fire({
          title: res.data.message,
          text: "Please check your email to verify your account",

          icon: "success",
          draggable: true,
        }).then(() => {
          router.replace("/login");
          return;
        });
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={newUser}>
      <div className="grid sm:grid-cols-2 gap-8">
        {isLoading && <Loader />}
        <div>
          <label className="text-slate-800 text-sm font-medium mb-2 block">
            First Name
          </label>
          <input
            name="firstName"
            required
            type="text"
            className="bg-slate-100 w-full text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
            placeholder="Enter name"
          />
        </div>
        <div>
          <label className="text-slate-800 text-sm font-medium mb-2 block">
            Last Name
          </label>
          <input
            required
            name="lastName"
            type="text"
            className="bg-slate-100 w-full text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
            placeholder="Enter last name"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-slate-800 text-sm font-medium mb-2 block">
            Email
          </label>
          <input
            required
            name="email"
            type="text"
            className="bg-slate-100 w-full text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
            placeholder="Enter email"
          />
        </div>

        <div>
          <label className="text-slate-800 text-sm font-medium mb-2 block">
            Password
          </label>
          <input
            required
            name="password"
            type="password"
            className="bg-slate-100 w-full text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
            placeholder="Enter password"
          />
        </div>
        <div>
          <label className="text-slate-800 text-sm font-medium mb-2 block">
            Confirm Password
          </label>
          <input
            required
            name="confirmPassword"
            type="password"
            className="bg-slate-100 w-full text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
            placeholder="Enter confirm password"
          />
        </div>
      </div>

      <div className="mt-12">
        <input
          type="submit"
          value="Sign Up"
          className="mx-auto block py-3 px-6 text-sm font-medium tracking-wider rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
        />
      </div>
    </form>
  );
};

export default SignUpForm;
