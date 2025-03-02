"use client";

import React, { createContext, useContext, useState, type ReactNode } from "react";


type LoginDialogContextType = {
  isLoginOpen: boolean;
  setIsLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// Create the context with default values
const LoginDialogContext = createContext<LoginDialogContextType>({
  isLoginOpen: false,
  setIsLoginOpen: () => { throw new Error("setIsLoginOpen function must be overridden"); },
});

// Custom hook to use the context
export const useLoginDialog = () => useContext(LoginDialogContext);

// Provider props
type LoginDialogProviderProps = {
  children: ReactNode;
};

// Provider component
export const LoginDialogProvider = ({ children }: LoginDialogProviderProps) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <LoginDialogContext.Provider value={{ isLoginOpen, setIsLoginOpen }}>
      {children}
    </LoginDialogContext.Provider>
  );
};