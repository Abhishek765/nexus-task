import { useEffect, useState } from "react";
import { PrimaryButton } from "../buttons";
import toast from "react-hot-toast";
import axios from "axios";
import { Input } from "../inputs";
import { Select } from "../selectors";
import { TextArea } from "../textarea";
import { TASK_STATUS } from "../../../types/task.types";
import { TASK_STATUS_MAP, taskOptions } from "../../../utils/constants";
import { useFetchTaskDataContext } from "../../../context/FetchTaskData";

const TaskForm = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<TASK_STATUS>(TASK_STATUS.TODO);

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const { setFetchTasks } = useFetchTaskDataContext();

  useEffect(() => {
    if (title.trim().length > 0 && description.trim().length > 0) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [description, title]);

  const handleSubmit = async () => {
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/tasks`,
        {
          title,
          description,
          status: TASK_STATUS_MAP[status],
        },
        config
      );
      toast.success(`Task created! ${response.data.newTask.title}`);
      setFetchTasks(true);
    } catch (error) {
      toast.error("Task creation Failed!");
    }

    setTitle("");
    setDescription("");
    setStatus(TASK_STATUS.TODO);
  };

  return (
    <div className="w-full mx-auto mt-8 max-w-md space-y-4">
      <div>
        <label htmlFor="title" className="block mb-1 font-semibold">
          Title
        </label>
        <Input
          id="title"
          type="text"
          value={title}
          placeholder="Enter task title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <TextArea
        id={"description"}
        label={"description"}
        value={description}
        setValue={setDescription}
      />
      <Select
        label="Status"
        value={status}
        setValue={setStatus}
        options={taskOptions}
      />
      <div>
        <PrimaryButton onClick={handleSubmit} disabled={!isButtonEnabled}>
          Add Task
        </PrimaryButton>
      </div>
    </div>
  );
};

export default TaskForm;
