"use client";

import { Provider } from "react-redux";
import { persistor, store } from "../store/store";
import { SessionProvider } from "next-auth/react";
import { PersistGate } from "redux-persist/integration/react";

export default function ProviderComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SessionProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>
      </SessionProvider>
    </>
  );
}
