"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import Sidebar from "../components/sidebar";

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={false} persistor={persistor}>
        <Sidebar />
        <div className="content overflow-hidden">{children}</div>
      </PersistGate>
    </Provider>
  );
}
