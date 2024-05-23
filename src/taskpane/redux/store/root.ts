import { configureStore } from "@reduxjs/toolkit";

import { modelSlice } from "./model/model";

export const store = configureStore({
  reducer: {
    model: modelSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
