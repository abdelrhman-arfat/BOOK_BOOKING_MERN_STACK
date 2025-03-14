import React from "react";

const UserCardSkeleton = () => {
  return (
    <div className="flex min-w-[300px] w-full flex-col justify-center items-center">
      <div className="mx-auto flex w-full flex-col justify-center px-5 pt-0 md:h-[unset] xl:pl-0">
        <div className="relative rounded-lg shadow-md flex w-full flex-col pt-[20px] md:pt-0">
          <div className="bg-card text-card-foreground mb-1 h-min flex items-center max-w-full py-2 px-0">
            <span className="relative flex h-[68px] w-[68px] shrink-0 overflow-hidden rounded-full">
              <div className="w-full h-full rounded-full animate-pulse bg-gradient-to-r from-gray-300 via-gray-400 to-gray-600"></div>
            </span>
            <div className="ml-4">
              <div className="w-[120px] h-5 rounded-md animate-pulse bg-gradient-to-r from-gray-300 via-gray-400 to-gray-600"></div>
            </div>
          </div>

          <div className="text-sm max-w-full flex-wrap line-clamp-1 text-zinc-400 pl-8">
            <div className="w-[180px] h-4 rounded-md animate-pulse bg-gradient-to-r from-gray-300 via-gray-400 to-gray-600"></div>
          </div>

          <div className="flex w-full mt-4 items-center px-4 justify-between py-2">
            <div className="w-[100px] h-[40px] rounded-md animate-pulse bg-gradient-to-r from-gray-300 via-gray-400 to-gray-600"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCardSkeleton;
