/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import React, { createContext, useContext, useEffect } from "react";
import { usePersistedState } from "../hooks";
import { localStorageKeys } from "../utils/constants";
import { AuthDataType } from "../types/auth.types";

interface AuthContextType {
  authToken: AuthDataType;
  setAuthToken: (token: AuthDataType) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authToken, setAuthToken] = usePersistedState<AuthDataType>(
    localStorageKeys.AUTH_TOKEN,
    null
  );

  useEffect(() => {
    if (authToken) {
      axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;
    }
  }, [authToken]);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
