import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
  FLUSH,
  PAUSE,
  PERSIST,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import productReducer from "./product-slice";

const persistConfig = {
  key: "dashboard",
  storage,
};

const persistedReducer = persistReducer(persistConfig, productReducer);

export const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
