/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";

interface TaskListContextType {
  fetchTasks: boolean;
  setFetchTasks: React.Dispatch<React.SetStateAction<boolean>>;
}

const FetchTaskDataContext = createContext<TaskListContextType | undefined>(
  undefined
);

export const FetchTaskDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [fetchTasks, setFetchTasks] = useState<boolean>(false);

  return (
    <FetchTaskDataContext.Provider value={{ fetchTasks, setFetchTasks }}>
      {children}
    </FetchTaskDataContext.Provider>
  );
};

export const useFetchTaskDataContext = () => {
  const context = useContext(FetchTaskDataContext);
  if (!context) {
    throw new Error(
      "useFetchTaskDataContext must be used within an FetchTaskDataContext"
    );
  }
  return context;
};
