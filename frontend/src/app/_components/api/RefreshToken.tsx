"use client";
import { logout, setCredentials } from "@/app/_RTK/redux-slices/authSlice";
import { app } from "@/app/Api/axiosInstance";
import { useAppDispatch } from "@/app/hooks/AppDispatch";
import useUserSelector from "@/app/hooks/AppSelectors";
import { useEffect } from "react";
import Cookies from "js-cookie";

const RefreshToken = () => {
  const dispatch = useAppDispatch();
  const userInfo = useUserSelector();

  useEffect(() => {
    const handler = setInterval(async () => {
      if (!Cookies.get("refreshToken")) {
        dispatch(logout());
        return;
      }
      try {
        app
          .post("users/refresh")
          .then((response) => {
            dispatch(setCredentials(response.data.data.user));
            return response.data;
          })
          .catch((error) => {
            return error;
          });
      } catch {
        dispatch(logout());
      }
    }, 1000 * 60 * 10);

    return () => clearInterval(handler);
  }, [dispatch, userInfo]);
  return <></>;
};

export default RefreshToken;
