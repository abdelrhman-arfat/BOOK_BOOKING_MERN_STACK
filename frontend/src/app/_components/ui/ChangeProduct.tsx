import { app } from "@/app/Api/axiosInstance";
import { TBook } from "@/app/types/Book";
import Image from "next/image";
import React from "react";
import { CgClose } from "react-icons/cg";
import Swal from "sweetalert2";

const ChangeProduct = ({
  book,
  refetch,
  setIsOpen,
}: {
  book: TBook;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
}) => {
  const handel = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title");
    const description = formData.get("description");
    const image = formData.get("image");
    const book_url = formData.get("book_url");

    if (!formData.get("image") || (formData.get("image") as File).size === 0) {
      formData.delete("image");
      formData.append("image", book.image);
    }

    if (!title || !book_url || !description || !image) {
      Swal.fire({
        title: "Error",
        text: "Please fill all the fields",
        icon: "error",
        draggable: false,
      });
      return;
    }

    app
      .patch(
        `products/${book._id}`,
        {
          title: title || book.title,
          description: description || book.description,
          image: image || book.image,
          book_url: book_url,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        if (res.status !== 200) {
          setIsOpen(false);
          Swal.fire({
            title: "Can't update product",
            icon: "error",
            timer: 3000,
            showCancelButton: true,
          });
          return;
        }
        setIsOpen(false);
        refetch();
        Swal.fire({
          title: "Product updated successfully",
          text: res.data.message || "Product updated successfully",
          icon: "success",
          timer: 3000,
          showCancelButton: true,
        });
      });
  };

  return (
    <div className=" px-6 sm:px-2 md:px-0 py-3 fixed inset-0 z-[40000] bg-white flex items-center justify-center ">
      <button
        onClick={() => setIsOpen(false)}
        className="absolute right-10 top-0 bg-red-500 text-white px-2 py-1 rounded "
      >
        <CgClose />
      </button>

      <div>
        <form onSubmit={handel} className="space-y-4 w-full">
          <div className="flex w-full items-center gap-3">
            <div className="w-2/3">
              <label className="block text-gray-700 font-semibold">Title</label>
              <input
                type="text"
                defaultValue={book.title}
                name="title"
                required
                placeholder="Enter product title"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-purple-300"
              />
            </div>
          </div>

          <div className="flex w-full items-center gap-3">

            <div className="w-2/3">
              <label className="block text-gray-700 font-semibold">URL</label>
              <input
                defaultValue={book.book_url}
                required
                name="book_url"
                placeholder="...https://example.com"
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-purple-300"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">
              New Description
            </label>
            <textarea
              required
              defaultValue={book.description}
              name="description"
              placeholder="Enter product description"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-purple-300"
            />
          </div>
          <div className="w-full rounded-xl overflow-hidden h-[200px] relative">
            <Image
              alt={book.title}
              fill
              sizes="100%"
              priority
              src={book.image}
            ></Image>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              name="image"
              className="w-full cursor-pointer  p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition"
          >
            update
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangeProduct;
