import React from "react";
import { FaHeart } from "react-icons/fa";

const BookCardSkelton = () => {
  return (
    <div className="max-w-[350px] mx-auto sm:mx-0 sm:max-w-full min-w-[200px] bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="min-w-[200px] bg-gray-400 animate-pulse min-h-[200px] relative"></div>
      <div className="p-5">
        <h5 className="mb-2 text-2xl bg-gray-400 animate-pulse w-[70px] min-h-[30px] font-bold tracking-tight text-gray-900 "></h5>
        <p className="mb-3 min-h-[60px] animate-pluse bg-gray-400 font-normal line-clamp-2 text-gray-700"></p>
        <div className="flex bg-gray-400 animate-pulse justify-between items-center">
          <div>
            <p className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none animate-pulse bg-gray-400 ">
              Download
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </p>
          </div>
          <div>
            <button className="rounded-full animate-pulse w-[40px] h-[40px] shadow-sm bg-gray-500 flex items-center justify-center text-xl sm:text-2xl">
              <FaHeart />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCardSkelton;
