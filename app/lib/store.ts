import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});



