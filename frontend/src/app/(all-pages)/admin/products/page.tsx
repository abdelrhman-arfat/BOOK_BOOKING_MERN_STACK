"use client";
import { app } from "@/app/Api/axiosInstance";
import React, { FormEvent } from "react";
import Swal from "sweetalert2";

const page = () => {
  return (
    <div>
      <form
        action=""
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const title = formData.get("title");
          const price = formData.get("price");
          const description = formData.get("description");
          const image = formData.get("image");
          if (!title || !description || !image || !price) {
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
                description,
                image,
              },
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            )
            .then((res) => {
              if (res.status !== 201) {
                Swal.fire({
                  title: "Error",
                  text: "Failed to create product",
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
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        <input type="text" placeholder="title" name="title" />
        <input type="number" placeholder="price" name="price" />
        <input type="text" placeholder="text" name="description" />
        <input type="file" accept="image/*" name="image" />
        <input type="submit" />
      </form>
    </div>
  );
};

export default page;
