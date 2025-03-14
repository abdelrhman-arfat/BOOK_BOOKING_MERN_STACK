import { configureStore } from "@reduxjs/toolkit";
import { userData } from "../RTK-query/query";
import { persistReduced } from "../redux-persist/AllSlices";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
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
