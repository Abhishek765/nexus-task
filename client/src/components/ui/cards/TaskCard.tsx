import { TASK_STATUS, TaskDataType } from "../../../types/task.types";
import {
  TASK_STATUS_MAP,
  TASK_STATUS_TO_VALUE_MAP,
} from "../../../utils/constants";

const TaskCard = ({ _id, title, description, status }: TaskDataType) => {
  console.log({ _id });
  const handleDelete = () => {};
  const handleUpdateStatus = () => {};

  return (
    <div className="bg-indigo-100 shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p className="text-gray-700 mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <span
          className={`px-2 py-1 text-sm font-semibold rounded ${
            status === TASK_STATUS_MAP[TASK_STATUS.TODO]
              ? "bg-yellow-200 text-yellow-800"
              : status === TASK_STATUS_MAP[TASK_STATUS.IN_PROGRESS]
              ? "bg-blue-200 text-blue-800"
              : "bg-green-200 text-green-800"
          }`}
        >
          {TASK_STATUS_TO_VALUE_MAP[status]}
        </span>
        <div>
          <button
            className="px-3 py-1 bg-red-500 text-white rounded mr-2"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded"
            onClick={handleUpdateStatus}
          >
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
