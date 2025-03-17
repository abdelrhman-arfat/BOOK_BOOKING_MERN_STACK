"use clinet";
import { TBook } from "@/app/types/Book";
import Image from "next/image";
import React, { useState } from "react";
import DeleteItemBtn from "../btns/DeleteItemBtn";
import ChangeProduct from "./ChangeProduct";

const BookMinCard = ({
  book,
  refetch,
}: {
  book: TBook;
  refetch: () => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      {isOpen && (
        <ChangeProduct setIsOpen={setIsOpen} refetch={refetch} book={book} />
      )}

      <div className="min-w-[330px] relative sm:min-w-[380px] lg:min-w-[400px] flex-1 rounded-xl  overflow-hidden bg-white border border-gray-300">
        <div
          onClick={() => setIsOpen((p: boolean) => !p)}
          className="absolute right-5 top-2 bg-sky-500 text-white px-2 py-1 rounded "
        >
          update
        </div>
        <div className="flex gap-2 h-[160px] justify-start">
          <div className="relative border-gray-400 border-r-4 h-full w-[100px] flex-shrink-0">
            <Image
              className="w-full  object-cover"
              src={book.image}
              sizes="100%"
              priority
              alt="book cover"
              fill
            ></Image>
          </div>
          <div className="flex flex-col justify-between py-2  w-full">
            <div className="flex flex-col gap-2">
              <p className="text-xl font-bold">{book.title}</p>

              <p className="text-gray-500 line-clamp-1  text-wrap">
                {book.description}
              </p>
              <p className="text-gray-500 line-clamp-2 text-wrap">
                Creator: {book.author.author_email}
              </p>
            </div>
            <div className="flex gap-2 sm:gap-0   justify-between pr-5 w-full">
              <span className="flex items-center justify-start text-gray-500">
                <svg
                  className="w-4 h-4 mr-1 mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <a
                  href={book.book_url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </a>
              </span>

              {/* delete btn */}
              <DeleteItemBtn text="product" id={book._id} refetch={refetch} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookMinCard;
