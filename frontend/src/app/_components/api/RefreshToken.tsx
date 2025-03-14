"use client";
import { logout } from "@/app/_RTK/redux-slices/authSlice";
import { refreshToken } from "@/app/Api/axiosInstance";
import { useAppDispatch } from "@/app/hooks/AppDispatch";
import useUserSelector from "@/app/hooks/AppSelectors";
import { useEffect } from "react";

const RefreshToken = () => {
  const dispatch = useAppDispatch();
  const userInfo = useUserSelector();

  useEffect(() => {
    if (!userInfo.isAuthenticated) {
      return;
    }
    const handler = setInterval(async () => {
      console.log("token");
      console.log("🔄 Refreshing token...");
      try {
        await refreshToken();
        console.log("�� Token refreshed.");
      } catch {
        dispatch(logout());
      }
    }, 1000 * 60 * 5);

    return () => clearInterval(handler);
  }, [dispatch, userInfo]);
  return <></>;
};

export default RefreshToken;
