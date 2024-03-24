export enum TASK_STATUS {
  TODO = "To Do",
  IN_PROGRESS = "In Progress",
  DONE = "Done",
}

export enum TASK_FILTER {
  TODO = "To Do",
  IN_PROGRESS = "In Progress",
  DONE = "Done",
  ALL = "All",
}

export type BACKEND_TASK_STATUS = "TODO" | "IN_PROGRESS" | "DONE";

export type TaskMapType = {
  [key in TASK_STATUS]: string;
};

export type TaskStatusToValueMapType = {
  [key in BACKEND_TASK_STATUS]: TASK_STATUS;
};

export type TaskDataType = {
  _id: string;
  title: string;
  description: string;
  status: BACKEND_TASK_STATUS | TASK_FILTER;
};
