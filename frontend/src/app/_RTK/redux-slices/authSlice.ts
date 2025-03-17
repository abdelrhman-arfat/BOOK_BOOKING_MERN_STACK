import { createSlice } from "@reduxjs/toolkit";
import type { TUser } from "@/app/types/User";

const initialState: {
  user?: TUser;
  isAuthenticated: boolean;
} = {
  user: {
    firstName: "",
    lastName: "",
    email: "",
    _id: "",
    role: "",
    isVerified: false,
    profilePicture: "",
  },
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = {
        firstName: "",
        lastName: "",
        email: "",
        _id: "",
        role: "",
        isVerified: false,
        profilePicture: "",
      };
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
