import { app } from "@/app/Api/axiosInstance";
import { TBook } from "@/app/types/Book";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaHeart } from "react-icons/fa";
import Swal from "sweetalert2";
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});
const BookCard = ({
  isFav,
  book,
  refetchFav,
  refetchBooks,
}: {
  isFav: boolean;
  book: TBook;
  refetchFav: () => void;
  refetchBooks: () => void;
}) => {
  return (
    <div className="max-w-[300px] mx-auto sm:mx-0 sm:max-w-full min-w-[300px] sm:min-w-[200px] bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="min-w-[200px] h-[200px] relative">
        <Image
          loading="lazy"
          sizes="100%"
          fill
          className="rounded-t-lg"
          src={book.image}
          alt={book.title}
        />
      </div>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
          {book.title}
        </h5>
        <p className="mb-3 min-h-[50px] font-normal line-clamp-2 text-gray-700">
          {book.description}
        </p>
        <div className="flex justify-between items-center">
          <div>
            <Link
              href={book.book_url}
              replace
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none bg-pink-600 "
            >
              Download
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
          </div>
          <div>
            <button
              style={{
                color: isFav ? "red" : "black",
                scale: isFav ? "1.12" : "1",
              }}
              onClick={() => {
                app
                  .post(`favorites/${book._id}`)
                  .then(() => {
                    refetchFav();
                    refetchBooks();
                    Toast.fire({
                      icon: "success",
                      title: "Updated in successfully",
                    });
                  })
                  .catch(() => {
                    Toast.fire({
                      icon: "error",
                      title: "Failed to update in favorite",
                    });
                  });
                return;
              }}
              className="rounded-full cursor-pointer w-[40px] h-[40px] shadow-sm bg-gray-100 flex items-center justify-center text-xl sm:text-2xl"
            >
              <FaHeart />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
