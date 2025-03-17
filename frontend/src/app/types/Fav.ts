import { TResponse } from "./Response";

export type TFav = {
  user_id: string;
  book_id: string;
  created_at: Date;
};
export type TAllFav = TResponse<TFav>;
