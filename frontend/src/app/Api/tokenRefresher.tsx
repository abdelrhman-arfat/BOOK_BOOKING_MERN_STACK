"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../_RTK/redux-slices/authSlice";
import { refreshToken } from "./axiosInstance";

const TokenRefresher = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Store interval ID
    const intervalId = setInterval(async () => {
      const success = await refreshToken();
      if (!success) {
        dispatch(logout());
      }
    }, 15 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  return null;
};

export default TokenRefresher;
