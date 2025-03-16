import { TAllUsers } from "@/app/types/User";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userData = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3003/api/",
    credentials: "include",
  }),
  endpoints: (build) => ({
    getAllUsers: build.query<TAllUsers, number>({
      query: (page?: number, limit?: number) =>
        `users?page=${page || 1}&limit=${limit || 10}`,
    }),
  }),
});

export const { useGetAllUsersQuery } = userData;
