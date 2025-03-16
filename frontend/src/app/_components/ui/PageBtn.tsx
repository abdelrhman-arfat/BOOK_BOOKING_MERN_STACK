"use client";
import React, { memo } from "react";

const PageBtn = ({
  func,
  text,
  isIncrement,
  page,
  totalPages,
  refetch,
}: {
  func: React.Dispatch<React.SetStateAction<number>>;
  text: string;
  isIncrement: boolean;
  page: number;
  refetch: () => void;
  totalPages: number;
}) => {
  return (
    <button
      onClick={() => {
        func((prev) =>
          isIncrement
            ? totalPages > page
              ? prev + 1
              : prev
            : prev > 1
            ? prev - 1
            : prev
        );
        refetch();
      }}
      style={{
        display: isIncrement
          ? page === totalPages
            ? "none"
            : "block"
          : page === 1
          ? "none"
          : "block",
      }}
      className="btn bg-linear-to-r from-pink-400 to-pink-600 hover:scale-105 duration-300  text-white "
    >
      {text}
    </button>
  );
};

export default memo(PageBtn);
