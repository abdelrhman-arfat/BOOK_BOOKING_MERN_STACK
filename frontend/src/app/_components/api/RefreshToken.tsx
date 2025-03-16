"use client";
import { logout, setCredentials } from "@/app/_RTK/redux-slices/authSlice";
import { app } from "@/app/Api/axiosInstance";
import { useAppDispatch } from "@/app/hooks/AppDispatch";
import useUserSelector from "@/app/hooks/AppSelectors";
import { useEffect } from "react";
// import Cookies from "js-cookie";

const RefreshToken = () => {
  const dispatch = useAppDispatch();
  const userInfo = useUserSelector();

  useEffect(() => {
    const handler = setInterval(async () => {
      try {
        app
          .post("users/refresh")
          .then((response) => {
            if (response.status !== 200) {
              dispatch(logout());
              return;
            }
            dispatch(setCredentials(response.data.data.results));
            return;
          })
          .catch(() => {
            dispatch(logout());
          });
      } catch {
        console.log("Failed to refresh token");
      }
    }, 1000 * 60 * 10); // after 10 minutes .

    return () => clearInterval(handler);
  }, [dispatch, userInfo]);
  return <></>;
};

export default RefreshToken;
