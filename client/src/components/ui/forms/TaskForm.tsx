import { useEffect, useState } from "react";
import { PrimaryButton } from "../buttons";
import toast from "react-hot-toast";
import axios from "axios";
import { Input } from "../inputs";
import { Select } from "../selectors";
import { OptionType } from "../selectors/Select/types";
import { TextArea } from "../textarea";
import { TASK_STATUS } from "../../../types/task.types";
import { TASK_STATUS_MAP } from "../../../utils/constants";

const options: OptionType[] = [
  {
    key: "TODO",
    value: "To Do",
  },
  {
    key: "IN_PROGRESS",
    value: "In Progress",
  },
  {
    key: "DONE",
    value: "Done",
  },
];

const TaskForm = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<
    TASK_STATUS.TODO | TASK_STATUS.IN_PROGRESS | TASK_STATUS.DONE
  >(TASK_STATUS.TODO);

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

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
      console.log({ response });
      toast.success("Task created!");
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
        options={options}
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
