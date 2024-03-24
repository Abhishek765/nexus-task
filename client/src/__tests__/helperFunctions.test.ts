import { describe, expect, it } from "vitest";
import {
  checkIsEmailValid,
  filterTasksByStatus,
} from "../utils/helperFunctions";
import { TASK_FILTER, TaskDataType } from "../types/task.types";
import { TASK_STATUS_MAP } from "../utils/constants";

describe("testing common helper functions", () => {
  it("testing checkIsEmailValid success case", () => {
    const sample = "abhi@sda.com";
    const answer = checkIsEmailValid(sample);
    expect(answer).toBe(true);
  });

  it("testing checkIsEmailValid error case ", () => {
    const sample = "abhisda.c";
    const answer = checkIsEmailValid(sample);
    expect(answer).toBe(false);
  });

  it("testing filterTasksByStatus", () => {});
});

describe("testing filterTasksByStatus", () => {
  const tasks: TaskDataType[] = [
    {
      _id: "1",
      title: "Task 1",
      description: "Description for Task 1",
      status: "TODO",
    },
    {
      _id: "2",
      title: "Task 2",
      description: "Description for Task 2",
      status: "IN_PROGRESS",
    },
    {
      _id: "3",
      title: "Task 3",
      description: "Description for Task 3",
      status: "DONE",
    },
    {
      _id: "4",
      title: "Task 4",
      description: "Description for Task 4",
      status: "IN_PROGRESS",
    },
  ];

  it("should filter tasks by TODO status", () => {
    const filteredTasks = filterTasksByStatus(
      TASK_STATUS_MAP[TASK_FILTER.TODO] as TASK_FILTER,
      tasks
    );
    expect(filteredTasks).toHaveLength(1);
    expect(filteredTasks[0].status).toBe("TODO");
  });

  it("should filter tasks by IN_PROGRESS status", () => {
    const filteredTasks = filterTasksByStatus(
      TASK_STATUS_MAP[TASK_FILTER.IN_PROGRESS] as TASK_FILTER,
      tasks
    );
    expect(filteredTasks).toHaveLength(2);
    expect(filteredTasks.every((task) => task.status === "IN_PROGRESS")).toBe(
      true
    );
  });

  it("should filter tasks by DONE status", () => {
    const filteredTasks = filterTasksByStatus(
      TASK_STATUS_MAP[TASK_FILTER.DONE] as TASK_FILTER,
      tasks
    );
    expect(filteredTasks).toHaveLength(1);
    expect(filteredTasks[0].status).toBe("DONE");
  });

  it("should return empty array when no tasks match the filter", () => {
    const filteredTasks = filterTasksByStatus(
      TASK_STATUS_MAP[TASK_FILTER.TODO] as TASK_FILTER,
      []
    );
    expect(filteredTasks).toHaveLength(0);
  });

  it("should return empty array when tasks array is empty", () => {
    const filteredTasks = filterTasksByStatus(
      TASK_STATUS_MAP[TASK_FILTER.IN_PROGRESS] as TASK_FILTER,
      []
    );
    expect(filteredTasks).toHaveLength(0);
  });
});
