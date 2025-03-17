import { TBooks } from "@/app/types/Book";
import { TAllFav } from "@/app/types/Fav";
import { TUsers } from "@/app/types/User";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userData = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3003/api/",
    credentials: "include",
  }),
  endpoints: (build) => ({
    getAllUsers: build.query<TUsers, number>({
      query: (page?: number, limit?: number) =>
        `users?page=${page || 1}&limit=${limit || 12}`,
    }),
    getAllBooks: build.query<TBooks, number>({
      query: (page?: number, limit?: number) =>
        `products?page=${page || 1}&limit=${limit || 12}`,
    }),
    getFav: build.query<TAllFav, void>({
      query: () => `favorites`,
    }),
  }),
});

export const { useGetAllUsersQuery, useGetAllBooksQuery, useGetFavQuery } =
  userData;
