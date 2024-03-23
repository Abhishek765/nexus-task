/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";
import { TaskDataType } from "../types/task.types";

interface TaskListContextType {
  taskList: TaskDataType[];
  setTaskList: (taskList: TaskDataType[]) => void;
}

const TaskListContext = createContext<TaskListContextType | undefined>(
  undefined
);

export const TaskListProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [taskList, setTaskList] = useState<TaskDataType[]>([]);

  return (
    <TaskListContext.Provider value={{ taskList, setTaskList }}>
      {children}
    </TaskListContext.Provider>
  );
};

export const useTaskListContext = () => {
  const context = useContext(TaskListContext);
  if (!context) {
    throw new Error(
      "useTaskListContext must be used within an TaskListContext"
    );
  }
  return context;
};
