import { TBooks } from "@/app/types/Book";
import { TAllFav } from "@/app/types/Fav";
import { TUsers } from "@/app/types/User";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const userData = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: "include",
  }),
  tagTypes: ["Users", "Books", "Favorites"],
  endpoints: (build) => ({
    getAllUsers: build.query<TUsers, number>({
      query: (page?: number, limit?: number) =>
        `users?page=${page || 1}&limit=${limit || 12}`,
      providesTags: ["Users"],
    }),
    getAllBooks: build.query<TBooks, number>({
      query: (page?: number, limit?: number) =>
        `products?page=${page || 1}&limit=${limit || 12}`,
      providesTags: ["Books"],
    }),
    getFav: build.query<TAllFav, void>({
      query: () => `favorites`,
      providesTags: ["Favorites"],
    }),
  }),
});

export const { useGetAllUsersQuery, useGetAllBooksQuery, useGetFavQuery } =
  userData;
