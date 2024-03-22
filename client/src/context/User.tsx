/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext } from "react";
import { UserDataType } from "../types/user.types";

interface UserContextType {
  user: UserDataType;
  saveUser: (user: UserDataType) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, saveUser] = useState<UserDataType>(null);

  return (
    <UserContext.Provider value={{ user, saveUser }}>
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
