import axios from "axios";
import { useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { useTaskListContext } from "../context/TaskList";
import { TaskCard } from "./ui/cards";

const TaskList = () => {
  const { taskList, setTaskList } = useTaskListContext();

  const fetchTaskList = useCallback(async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/tasks`,
        {
          withCredentials: true,
        }
      );
      if (response.data?.tasks) setTaskList(response.data.tasks);

      toast.success("Fetching tasks...");
    } catch (error) {
      toast.error("Failed to fetch task list");
    }
  }, [setTaskList]);

  useEffect(() => {
    // fetchTaskList();
  }, [fetchTaskList]);

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-5">
      {taskList?.map((task) => {
        return (
          <div key={task?.title}>
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

export default TaskList;
