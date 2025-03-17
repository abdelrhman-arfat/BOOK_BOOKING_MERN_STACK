import { TUser } from "@/app/types/User";
import Image from "next/image";
import ChangeRoleBtn from "../btns/ChangeRoleBtn";
import useUserSelector from "@/app/hooks/AppSelectors";
import { userRoles } from "@/app/constant/userRoles";
import DeleteItemBtn from "../btns/DeleteItemBtn";

const UserCard = ({ user, refetch }: { refetch: () => void; user: TUser }) => {
  const loginUser = useUserSelector();

  return (
    <div className="flex w-full flex-col justify-center items-center ">
      <div className="mx-auto flex w-full flex-col justify-center px-5 pt-0 md:h-[unset]  xl:pl-0">
        <div className="relative rounded-lg shadow-md  flex w-full flex-col pt-[20px] md:pt-0">
          <div className="bg-card text-card-foreground mb-1 h-min flex items-center align-center max-w-full py-2 px-0 ">
            <span className="relative  flex h-10 w-10 shrink-0 overflow-hidden rounded-full min-h-[68px] min-w-[68px]">
              <Image
                priority
                sizes="100%"
                src={user.profilePicture}
                alt={user.firstName + "image"}
                fill
              ></Image>
            </span>
            <div>
              <p className="w-full text-[18px] font-bold leading-[100%] md:text-[19px]">
                {user.firstName + " " + user.lastName}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm max-w-full flex-wrap line-clamp-1 text-zinc-400 pl-5 md:pl-8">
              {user.role}
            </p>
            <p className="text-sm max-w-full flex-wrap line-clamp-1  text-zinc-400 pl-5  md:pl-8">
              {user.email}
            </p>
            <p
              className={`text-sm max-w-full ${
                user.isVerified ? "text-green-400" : "text-red-400"
              } flex-wrap line-clamp-1 pl-5  md:pl-8`}
            >
              {user.isVerified ? "Verified" : "Not verified"}
            </p>
          </div>
          <div className="min-h-[65px]">
            {user.email === loginUser.user?.email ? (
              <div className="flex w-full mt-4 items-center px-4 justify-between py-2">
                Your account
              </div>
            ) : loginUser.user?.role === userRoles.SUPERADMIN ||
              loginUser.user?.role === userRoles.LEADER ? (
              <div className="flex w-full mt-4 items-center px-2 sm:px-4 justify-between py-2">
                <DeleteItemBtn text="user" refetch={refetch} id={user._id} />
                <ChangeRoleBtn
                  refetch={refetch}
                  role={user.role}
                  id={user._id}
                />
              </div>
            ) : (
              <div className="flex w-full mt-4 items-center px-4 justify-between py-2">
                can{"'"}t delete or change role
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
