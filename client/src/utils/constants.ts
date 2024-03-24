import { OptionType } from "../components/ui/selectors/Select/types";
import {
  TASK_STATUS,
  TaskMapType,
  TaskStatusToValueMapType,
} from "../types/task.types";

export const VALID_EMAIL_REGEX = RegExp(
  // eslint-disable-next-line
  /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
);

export const localStorageKeys = {
  USER_DATA: "USER_DATA",
};

export const TASK_STATUS_MAP: TaskMapType = {
  [TASK_STATUS.TODO]: "TODO",
  [TASK_STATUS.IN_PROGRESS]: "IN_PROGRESS",
  [TASK_STATUS.DONE]: "DONE",
};

export const TASK_STATUS_TO_VALUE_MAP: TaskStatusToValueMapType = {
  TODO: TASK_STATUS.TODO,
  IN_PROGRESS: TASK_STATUS.IN_PROGRESS,
  DONE: TASK_STATUS.DONE,
};

export const taskOptions: OptionType[] = [
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

export const filterOptions: OptionType[] = [
  ...taskOptions,
  {
    key: "ALL",
    value: "All",
  },
];
