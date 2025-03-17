"use client";
import {
  useGetAllBooksQuery,
  useGetFavQuery,
} from "@/app/_RTK/RTK-query/query";
import React, { useState } from "react";
import PageBtn from "./PageBtn";
import { TBook } from "@/app/types/Book";
import BookCard from "./BookCard";
import BookCardSkelton from "./BookCardSkelton";

const AllBooksUsersPage = () => {
  const [page, setPage] = useState<number>(1);
  const getBooks = useGetAllBooksQuery(page);
  const fav = useGetFavQuery();

  if (getBooks.isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {Array.from({ length: 10 }, (_, index) => (
          <BookCardSkelton key={index + "-skeleton-card-book"} />
        ))}
      </div>
    );
  }

  const favBooks =
    fav?.data?.data?.results.map((favBook) => favBook.book_id) || [];
  return (
    <div>
      <div className="flex w-full justify-between items-center">
        <PageBtn
          refetch={getBooks.refetch}
          totalPages={getBooks?.data?.totalPages || 1}
          page={page}
          isIncrement={false}
          func={setPage}
          text="Pervious"
        />
        <PageBtn
          refetch={getBooks.refetch}
          totalPages={getBooks?.data?.totalPages || 1}
          page={page}
          isIncrement={true}
          func={setPage}
          text="Next"
        />
      </div>
      <div></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {getBooks?.data?.data?.results?.map((book: TBook) => (
          <BookCard
            isFav={favBooks.includes(book._id)}
            refetchFav={fav.refetch}
            refetchBooks={getBooks.refetch}
            key={book._id}
            book={book}
          />
        ))}
      </div>
    </div>
  );
};

export default AllBooksUsersPage;
