"use client";
import { app } from "@/app/Api/axiosInstance";
import React, { FormEvent, useState } from "react";
import Swal from "sweetalert2";
import Loader from "../loaders/Loader";

const AddNewProduct = ({ refetch }: { refetch: () => void }) => {
  const [loader, setLoader] = useState<boolean>(false);
  const handelAddNewProduct = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title");
    const price = formData.get("price");
    const description = formData.get("description");
    const image = formData.get("image");
    const quantity = formData.get("quantity");
    const book_url = formData.get("book_url");
    if (!title || !book_url || !description || !image || !price || !quantity) {
      Swal.fire({
        title: "Error",
        text: "Please fill all the fields",
        icon: "error",
        draggable: false,
      });
      return;
    }
    app
      .post(
        "products",
        {
          title,
          price: +price,
          quantity: +quantity,
          description,
          image,
          book_url,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setLoader(false);
        if (res.status !== 201) {
          Swal.fire({
            title: "Error",
            text: res.data.message || "There was an error please try again",
            icon: "error",
            draggable: false,
          });
          return;
        }
        Swal.fire({
          title: "Success",
          text: "Product created successfully",
          icon: "success",
          draggable: true,
        }).then(() => {
          refetch();
          const form = e.target as HTMLFormElement;
          form.reset();
        });
      })
      .catch(() => {
        setLoader(false);
        Swal.fire({
          title: "Error",
          text: "Failed to create product",
          icon: "error",
          draggable: false,
        });
      });
  };
  return (
    <div className="mx-auto p-6 bg-white shadow-lg rounded-lg">
      {loader && <Loader />}
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Product</h2>
      <form onSubmit={handelAddNewProduct} className="space-y-4 w-full">
        <div className="flex w-full items-center gap-3">
          <div className="w-2/3">
            <label className="block text-gray-700 font-semibold">Title</label>
            <input
              type="text"
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
            Description
          </label>
          <textarea
            required
            name="description"
            placeholder="Enter product description"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-purple-300"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">
            Product Image
          </label>
          <input
            required
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
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddNewProduct;
