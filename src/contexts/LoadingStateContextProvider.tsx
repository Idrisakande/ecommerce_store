import { T_loading_provider } from "@/types/loading";
import React, { FC, ReactNode, createContext, useState } from "react";

interface LoadingStateContextProviderProps {
  children: ReactNode;
}

// export Loading state context
export const LoadingStateContext = createContext<T_loading_provider | null>(
  null
);

export const LoadingStateContextProvider: FC<
  LoadingStateContextProviderProps
> = ({ children }) => {
  // to manage the loading state
  const [isLoading, setIsloading] = useState<boolean>(false);
  return (
    <LoadingStateContext.Provider value={{ isLoading, setIsloading }}>
      {children}
    </LoadingStateContext.Provider>
  );
};
