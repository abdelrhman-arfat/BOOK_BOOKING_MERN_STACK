import { useDispatch } from "react-redux";
import { AppDispatch } from "../_RTK/redux-store/store";

const useAppDispatch = () => {
  return useDispatch<AppDispatch>();
};

export { useAppDispatch };
