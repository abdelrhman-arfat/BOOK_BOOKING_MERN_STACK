import { TResponse } from "./Response";

export type TBook = {
  _id: string;
  title: string;
  author: {
    author_id: string;
    author_name: string;
    author_email: string;
  };
  description: string;
  book_url: string;
  image: string;
};

export type TBooks = TResponse<TBook>;
