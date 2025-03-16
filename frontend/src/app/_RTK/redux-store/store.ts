import { configureStore } from "@reduxjs/toolkit";
import { userData } from "../RTK-query/query";
import { persistReduced } from "../redux-persist/AllSlices";

// solve import Error :
const FLUSH: string = "persist/FLUSH";
const REHYDRATE: string = "persist/REHYDRATE";
const PAUSE: string = "persist/PAUSE";
const PERSIST: string = "persist/PERSIST";
const PURGE: string = "persist/PURGE";
const REGISTER: string = "persist/REGISTER";

import { persistStore } from "redux-persist";
const store = configureStore({
  reducer: persistReduced,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(userData.middleware),
  devTools: process.env.NODE_ENV === "development",
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
