export type TUser = {
  firstName: string;
  lastName: string;
  email: string;
  _id: string;
  role: string;
  profilePicture: string;
};

export type TAllUsers = {
  data: {
    Users: TUser[];
  };
  refetch: () => void;
};
