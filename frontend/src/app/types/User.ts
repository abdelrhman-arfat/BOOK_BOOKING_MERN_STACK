export type TUser = {
  firstName: string;
  lastName: string;
  email: string;
  _id: string;
  role: string;
  isVerified: boolean;
  profilePicture: string;
};

export type TAllUsers = {
  data: {
    results: TUser[];
  };
  totalPages: number;
  totalUsers: number;
  currentPage: number;
  refetch: () => void;
};


