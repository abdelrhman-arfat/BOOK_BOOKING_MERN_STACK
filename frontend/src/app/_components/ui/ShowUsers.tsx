"use client";
import UserCard from "@/app/_components/ui/UserCard";
import { useGetAllUsersQuery } from "@/app/_RTK/RTK-query/query";
import { TUser } from "@/app/types/User";
import UserCardSkeleton from "../loaders/UserCardSkeleton";

const ShowUsers = () => {
  const getUsers = useGetAllUsersQuery();

  if (getUsers.isError) {
    return <div>You Do not have the access to get any user</div>;
  }

  return (
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
        getUsers?.data?.data?.Users?.map((user: TUser) => (
          <div key={user._id}>
            <UserCard user={user} />
          </div>
        ))}
    </div>
  );
};

export default ShowUsers;
