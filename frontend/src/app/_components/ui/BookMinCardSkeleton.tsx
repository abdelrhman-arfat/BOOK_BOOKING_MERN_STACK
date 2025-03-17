import React from "react";

const BookMinCardSkeleton = () => {
  return (
    <div className=" min-w-[330px] sm:min-w-[380px] lg:min-w-[400px] ">
      <div className="flex gap-3 bg-white border min-h-[160px]  rounded-xl overflow-hidden items-center justify-start  animate-pulse">
        <div className="animate-pulse bg-gray-500  min-h-[160px] min-w-[100px] flex-shrink-0"></div>

        <div className="flex flex-col gap-3 py-2 w-full">
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>

          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>

          <div className="flex items-center justify-start gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookMinCardSkeleton;
