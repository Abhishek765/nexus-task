import axios from "axios";
import {
  BACKEND_TASK_STATUS,
  TASK_STATUS,
  TaskDataType,
} from "../../../types/task.types";
import {
  TASK_STATUS_MAP,
  TASK_STATUS_TO_VALUE_MAP,
  taskOptions,
} from "../../../utils/constants";
import toast from "react-hot-toast";
import { useFetchTaskDataContext } from "../../../context/FetchTaskData";
import { Overlay } from "../overlays";
import { useState } from "react";
import { Select } from "../selectors";
import { PrimaryButton } from "../buttons";

const TaskCard = ({ _id, title, description, status }: TaskDataType) => {
  const { setFetchTasks } = useFetchTaskDataContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false);

  const [updatedStatus, setUpdatedStatus] = useState<TASK_STATUS>(
    TASK_STATUS_TO_VALUE_MAP[status as BACKEND_TASK_STATUS]
  );

  const handleDelete = async (taskId: string) => {
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    setIsDeleteLoading(true);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/tasks/${taskId}`,
        config
      );
      toast.success(
        `${response.data.message}, ${response.data.deletedTask.title}`
      );
      setFetchTasks(true);
    } catch (error) {
      toast.error("Task Deletion Failed!");
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const handleOpenOverlay = () => {
    setIsOpen(true);
  };

  const handleCloseOverlay = () => {
    setIsOpen(false);
  };

  const handleUpdateStatus = async (taskId: string) => {
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    setIsUpdateLoading(true);
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/tasks/${taskId}`,
        {
          status: TASK_STATUS_MAP[updatedStatus],
        },
        config
      );
      toast.success(
        `${response.data.message}, ${response.data.updatedTask.title}`
      );
      setFetchTasks(true);
    } catch (error) {
      toast.error("Updating Task Failed!");
    } finally {
      handleCloseOverlay();
      setIsUpdateLoading(false);
    }
  };

  return (
    <>
      <div className="bg-indigo-100 shadow-md rounded-lg p-4 mb-4">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="text-gray-700 mb-4">{description}</p>
        <div className="flex justify-between items-center gap-2">
          <span
            className={`px-2 py-1 text-sm font-semibold rounded ${
              status === TASK_STATUS_MAP[TASK_STATUS.TODO]
                ? "bg-yellow-200 text-yellow-800"
                : status === TASK_STATUS_MAP[TASK_STATUS.IN_PROGRESS]
                ? "bg-blue-200 text-blue-800"
                : "bg-green-200 text-green-800"
            }`}
          >
            {TASK_STATUS_TO_VALUE_MAP[status as BACKEND_TASK_STATUS]}
          </span>
          <div>
            <button
              disabled={isDeleteLoading}
              className="px-3 py-1 disabled:bg-red-300 bg-red-500 text-white rounded mr-2"
              onClick={() => handleDelete(_id)}
            >
              {isDeleteLoading ? "Loading..." : "Delete"}
            </button>
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded"
              onClick={handleOpenOverlay}
            >
              Update Status
            </button>
          </div>
        </div>
      </div>
      <Overlay
        isOpen={isOpen}
        onClose={isUpdateLoading ? () => {} : handleCloseOverlay}
      >
        <div className=" min-w-[300px] space-y-4">
          <Select
            label="Update status"
            value={updatedStatus}
            setValue={setUpdatedStatus}
            options={taskOptions}
          />

          <PrimaryButton
            onClick={() => handleUpdateStatus(_id)}
            disabled={isUpdateLoading}
          >
            {isUpdateLoading ? "Loading..." : "update"}
          </PrimaryButton>
        </div>
      </Overlay>
    </>
  );
};

export default TaskCard;
