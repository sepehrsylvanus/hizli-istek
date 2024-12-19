import React, { createContext, useState, useContext } from "react";

// Define the shape of the context value
const AuthModalContext = createContext({
  openAuth: false,
  setOpenAuth: (value: any) => {},
  step: "phone",
  setStep: (value: string) => {},
});

// Create a provider component
export const AuthModalProvider = ({ children }: any) => {
  const [openAuth, setOpenAuth] = useState(false);
  const [step, setStep] = useState("phone");
  return (
    <AuthModalContext.Provider value={{ openAuth, setOpenAuth, step, setStep }}>
      {children}
    </AuthModalContext.Provider>
  );
};

// Create a hook to use the AuthModalContext
export const useAuthModal = () => {
  return useContext(AuthModalContext);
};
