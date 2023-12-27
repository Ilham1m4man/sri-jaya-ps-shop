"use client"

import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const showLoading = () => {
    setIsLoading(true);
  };

  const hideLoading = () => {
    setIsLoading(false);
  };

  const showFetching = () => {
    setIsFetching(true);
  };

  const hideFetching = () => {
    setIsFetching(false);
  };

  return (
    <AppContext.Provider
      value={{
        isLoading,
        showLoading,
        hideLoading,
        isFetching,
        showFetching,
        hideFetching,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
