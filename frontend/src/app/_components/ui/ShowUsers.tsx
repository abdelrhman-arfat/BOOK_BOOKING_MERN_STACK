"use client";
import UserCard from "@/app/_components/ui/UserCard";
import { useGetAllUsersQuery } from "@/app/_RTK/RTK-query/query";
import { TUser } from "@/app/types/User";
import UserCardSkeleton from "../loaders/UserCardSkeleton";
import { useState } from "react";
import PageBtn from "./PageBtn";

const ShowUsers = () => {
  const [page, setPage] = useState<number>(1);
  const getUsers = useGetAllUsersQuery(page);

  if (getUsers.isError) {
    return <div>You Do not have the access to get any user</div>;
  }
  return (
    <>
      <div className="flex w-full justify-between items-center">
        <PageBtn
          refetch={getUsers.refetch}
          totalPages={getUsers?.data?.totalPages || 1}
          page={page}
          isIncrement={true}
          func={setPage}
          text="Next"
        />
        <PageBtn
          refetch={getUsers.refetch}
          totalPages={getUsers?.data?.totalPages || 1}
          page={page}
          isIncrement={false}
          func={setPage}
          text="Pervious"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-2 mt-3 w-full">
        {getUsers.isLoading &&
          Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index + "skeleton-loading"}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-2 mt-3 w-full"
            >
              <UserCardSkeleton />
            </div>
          ))}
        {getUsers &&
          getUsers?.data?.data?.results?.map((user: TUser) => (
            <div key={user._id}>
              <UserCard refetch={getUsers.refetch} user={user} />
            </div>
          ))}
      </div>
    </>
  );
};

export default ShowUsers;
