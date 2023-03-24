import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { addressApiSlice } from "../API/apiSlice";

const store = configureStore({
  reducer: {
    [addressApiSlice.reducerPath]: addressApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

setupListeners(store.dispatch);

export default store;
