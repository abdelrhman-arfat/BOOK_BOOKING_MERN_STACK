"use client";

import { Provider } from "react-redux";
import store, { persistor } from "../redux-store/store";
import RefreshToken from "@/app/_components/api/RefreshToken";
import { PersistGate } from "redux-persist/integration/react";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <RefreshToken />
        {children}
      </PersistGate>
    </Provider>
  );
};
