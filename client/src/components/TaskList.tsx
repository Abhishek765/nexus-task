import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTaskListContext } from "../context/TaskList";
import { useFetchTaskDataContext } from "../context/FetchTaskData";
import { TASK_FILTER } from "../types/task.types";
import TaskListContent from "./TaskListContent";

type TaskListProps = {
  taskStatusFilter: TASK_FILTER;
};

const TaskList = ({ taskStatusFilter }: TaskListProps) => {
  const { taskList, setTaskList } = useTaskListContext();
  const { fetchTasks, setFetchTasks } = useFetchTaskDataContext();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTaskList = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/tasks`,
        {
          withCredentials: true,
        }
      );
      if (response.data?.tasks) {
        setTaskList(response.data.tasks);
      }
      toast.success("Fetching tasks...");
      setFetchTasks(false);
    } catch (error: any) {
      const axiosErrorMessage = error?.response?.data?.message;
      if (!axiosErrorMessage) {
        toast.error("Failed to fetch task list");
      }
    } finally {
      setLoading(false);
    }
  }, [setTaskList]);

  useEffect(() => {
    fetchTaskList();
  }, [fetchTaskList]);

  useEffect(() => {
    if (fetchTasks) {
      fetchTaskList();
    }
  }, [fetchTaskList, fetchTasks]);

  if (loading) return <p>Loading Content...</p>;

  return (
    <TaskListContent taskList={taskList} taskStatusFilter={taskStatusFilter} />
  );
};

export default TaskList;
