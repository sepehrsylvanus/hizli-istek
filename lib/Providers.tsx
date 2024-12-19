"use client";
import React, { FC } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AuthProvider } from "../features/AuthContext";
import { AuthModalProvider } from "@/features/AuthModalContext";
import { store } from "@/app/store";
import { Provider } from "react-redux";
interface ProvidersProps {
  children: React.ReactNode;
}
const queryClient = new QueryClient();
const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Provider store={store}>
          <AuthModalProvider>{children}</AuthModalProvider>
        </Provider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default Providers;
