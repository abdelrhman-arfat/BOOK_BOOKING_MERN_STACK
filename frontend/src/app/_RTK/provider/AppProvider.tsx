"use client";

import { Provider } from "react-redux";
import store, { persistor } from "../redux-store/store";
import { PersistGate } from "redux-persist/integration/react";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        {children}
      </PersistGate>
    </Provider>
  );
};
