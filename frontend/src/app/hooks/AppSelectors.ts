import { useSelector } from "react-redux";
import { RootState } from "../_RTK/redux-store/store";

// ------------------- STORE CUSTOM HOOKS --------------------

const useUserSelector = () => {
  return useSelector((state: RootState) => state.auth);
};

export default useUserSelector;
