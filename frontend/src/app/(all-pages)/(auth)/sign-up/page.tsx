import React from "react";
import SignUpForm from "@/app/_components/ui/SignUpForm";

const page = () => {
  return (
    <div className="max-w-4xl max-sm:max-w-lg mx-auto p-6 mt-6">
      <div className="text-center mb-12 sm:mb-16">
        <h4 className="text-slate-600 text-base mt-6">
          Sign up into your account
        </h4>
      </div>
      <SignUpForm />
    </div>
  );
};

export default page;
