import { TUser } from "@/app/types/User";
import Image from "next/image";
import DeleteUserBtn from "../btns/DeleteUserBtn";
import ChangeRoleBtn from "../btns/ChangeRoleBtn";
import useUserSelector from "@/app/hooks/AppSelectors";
import { userRoles } from "@/app/constant/userRoles";

const UserCard = ({ user }: { user: TUser }) => {
  const loginUser = useUserSelector();

  return (
    <div className="flex w-full flex-col justify-center items-center ">
      <div className="mx-auto flex w-full flex-col justify-center px-5 pt-0 md:h-[unset]  xl:pl-0">
        <div className="relative rounded-lg shadow-md  flex w-full flex-col pt-[20px] md:pt-0">
          <div className="bg-card text-card-foreground mb-1 h-min flex items-center align-center max-w-full py-2 px-0 ">
            <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full min-h-[68px] min-w-[68px]">
              <Image
                src={user.profilePicture}
                alt={user.firstName + "image"}
                fill
              ></Image>
            </span>
            <div>
              <p className="w-full text-[20px] font-bold leading-[100%] md:text-xl">
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
          </div>
          <div className="min-h-[65px]">
            {user.email !== loginUser.user?.email ||
            ![userRoles.LEADER, userRoles.SUPERADMIN].includes(user.role) ? (
              <div className="flex w-full mt-4 items-center px-4 justify-between py-2">
                <DeleteUserBtn id={user._id} />
                <ChangeRoleBtn role={user.role} id={user._id} />
              </div>
            ) : (
              <div className="flex w-full mt-4 items-center px-4 justify-between py-2">
                can{"'"}t change role
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
