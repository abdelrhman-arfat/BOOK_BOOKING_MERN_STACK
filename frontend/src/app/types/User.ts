import { TResponse } from "./Response";

export type TUser = {
  firstName: string;
  lastName: string;
  email: string;
  _id: string;
  role: string;
  isVerified: boolean;
  profilePicture: string;
};

export type TUsers = TResponse<TUser>;
