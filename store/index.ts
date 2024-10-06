import { configureStore } from "@reduxjs/toolkit";
import themeSliceReducer from "../features/theme/theme.slice";

export const store = configureStore({
  reducer: {
    theme: themeSliceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
