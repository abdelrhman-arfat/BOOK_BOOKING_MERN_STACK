"use client";
import {
  useGetAllBooksQuery,
  useGetFavQuery,
} from "@/app/_RTK/RTK-query/query";
import { useState } from "react";
import PageBtn from "./PageBtn";
import BookCardSkelton from "./BookCardSkelton";
import BookCard from "./BookCard";
import { TBook } from "@/app/types/Book";

const FavBooks = () => {
  const [page, setPage] = useState<number>(1);
  const getFav = useGetFavQuery();
  const getBooks = useGetAllBooksQuery(page);
  if (getFav.data?.data?.results.length === 0) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center">
        <h1 className="text-2xl">You have no favorite books</h1>
      </div>
    );
  }

  const favBooks =
    getFav?.data?.data?.results.map((book) => book.book_id) || [];

  if (getBooks.isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {Array.from({ length: 10 }, (_, index) => (
          <BookCardSkelton key={index + "-skeleton-card-book"} />
        ))}
      </div>
    );
  }

  const filteredBooks = getBooks?.data?.data?.results?.filter((book: TBook) =>
    favBooks.includes(book._id)
  );

  return (
    <div className="mt-10">
      <div>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {filteredBooks?.map((book: TBook) => (
          <BookCard
            isFav={true}
            refetchFav={getFav.refetch}
            refetchBooks={getBooks.refetch}
            key={book._id}
            book={book}
          />
        ))}
      </div>
    </div>
  );
};

export default FavBooks;
