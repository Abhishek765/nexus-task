/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext } from "react";
import { UserDataType } from "../types/user.types";
import { localStorageKeys } from "../utils/constants";
import { usePersistedState } from "../hooks";

interface UserContextType {
  user: UserDataType;
  setUser: (user: UserDataType) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = usePersistedState<UserDataType>(
    localStorageKeys.USER_DATA,
    null
  );

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within an UserProvider");
  }
  return context;
};
