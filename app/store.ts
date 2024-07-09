import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/authSlice";
import stepReducer from "@/features/stepSlice";
import openAuthReducer from "@/features/openAuthSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    step: stepReducer,
    openAuth: openAuthReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
