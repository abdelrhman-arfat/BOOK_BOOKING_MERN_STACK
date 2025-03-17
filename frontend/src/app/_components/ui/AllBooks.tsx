"use client";
import BookMinCardSkeleton from "./BookMinCardSkeleton";
import BookMinCard from "./BookMinCard";
import { TBook } from "@/app/types/Book";
import { SetStateAction } from "react";
import PageBtn from "./PageBtn";
const AllBooks = ({
  Books,
  page,
  refetch,
  totalPages,
  isLoading,
  isError,
  func,
}: {
  page: number;
  Books: TBook[];
  totalPages: number;
  isError: boolean;
  isLoading: boolean;
  refetch: () => void;
  func: React.Dispatch<SetStateAction<number>>;
}) => {
  if (isLoading) {
    return (
      <div className="my-10 flex flex-wrap  gap-2 ">
        {Array.from({ length: 10 }, (_, index) => (
          <BookMinCardSkeleton key={index + "-skeleton-card-book-min"} />
        ))}
      </div>
    );
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="my-6">
      <div className="flex w-full justify-between items-center">
        <PageBtn
          isIncrement={false}
          text="Pervious"
          refetch={refetch}
          page={page}
          func={func}
          totalPages={totalPages || 1}
        />
        <PageBtn
          isIncrement={true}
          text="Next"
          refetch={refetch}
          page={page}
          func={func}
          totalPages={totalPages || 1}
        />
      </div>
      <div className="my-4 flex flex-wrap   gap-2 ">
        {Books?.map((book: TBook, index: number) => (
          <BookMinCard
            refetch={refetch}
            book={book}
            key={index + "min-card-book"}
          />
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
