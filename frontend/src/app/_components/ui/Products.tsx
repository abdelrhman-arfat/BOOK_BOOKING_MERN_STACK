"use client";
import React, { useState } from "react";
import AddNewProduct from "./AddNewProduct";
import AllBooks from "./AllBooks";
import { useGetAllBooksQuery } from "@/app/_RTK/RTK-query/query";

const Products = () => {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, isError, refetch } = useGetAllBooksQuery(page);

  const booksProps = {
    page,
    Books: data?.data?.results || [],
    totalPages: data?.totalPages || 1,
    isError,
    isLoading,
    refetch,
    func: setPage,
  };

  return (
    <div className="w-full">
      <AddNewProduct refetch={refetch} />
      <hr className="mt-4" />

      <AllBooks {...booksProps} />
    </div>
  );
};

export default Products;
