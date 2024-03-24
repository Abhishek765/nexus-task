import React, { useEffect, useState } from "react";
import { TASK_FILTER, TaskDataType } from "../types/task.types";
import { TaskCard } from "./ui/cards";
import { filterTasksByStatus } from "../utils/helperFunctions";
import { TASK_STATUS_MAP } from "../utils/constants";

type TaskListContentProps = {
  taskList: TaskDataType[];
  taskStatusFilter: TASK_FILTER;
};

const TaskListContent = ({
  taskList,
  taskStatusFilter,
}: TaskListContentProps) => {
  const [localTaskList, setLocalTaskList] = useState<TaskDataType[]>([]);

  useEffect(() => {
    if (taskStatusFilter !== TASK_FILTER.ALL) {
      const filteredTaskList = filterTasksByStatus(
        TASK_STATUS_MAP[taskStatusFilter] as TASK_FILTER,
        taskList
      );
      setLocalTaskList(filteredTaskList);
    } else {
      setLocalTaskList(taskList);
    }
  }, [taskList, taskStatusFilter]);

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-5">
      {localTaskList?.map((task) => {
        return (
          <div key={task?._id}>
            <TaskCard
              _id={task._id}
              title={task.title}
              description={task.description}
              status={task.status}
            />
          </div>
        );
      })}
    </div>
  );
};

export default TaskListContent;
