"use client";
import { logout, setCredentials } from "@/app/_RTK/redux-slices/authSlice";
import { app } from "@/app/Api/axiosInstance";
import { useAppDispatch } from "@/app/hooks/AppDispatch";
import { useCallback, useEffect, useRef } from "react";

const RefreshToken = () => {
  const dispatch = useAppDispatch();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const refreshAuthToken = useCallback(async () => {
    try {
      const response = await app.post("users/refresh");
      if (response.status === 200 && response.data?.data?.results) {
        dispatch(setCredentials(response.data.data.results));
      } else {
        throw new Error("Invalid response");
      }
    } catch {
      dispatch(logout());
    }
  }, [dispatch]);

  useEffect(() => {
    refreshAuthToken();

    intervalRef.current = setInterval(refreshAuthToken, 1000 * 60 * 10); // Refresh every 10 minutes

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [refreshAuthToken]);

  return null;
};

export default RefreshToken;
