import { Request, Response } from 'express';
import { TaskModel } from '../models/task.model';

/**
 * @description To create a new task
 * @method POST
 * @route /api/v1/tasks
 */
export const createTask = async (req: Request, res: Response) => {
  const newTask = new TaskModel({
    ...req.body,
    owner: (req as any).user._id
  });

  try {
    await newTask.save();
    res.status(201).json({ message: 'task created successfully', newTask });
  } catch (error) {
    res.status(500).json({
      error,
      message: 'Task creation failed'
    });
  }
};

/**
 * @description To get all tasks related to a user
 * @method GET
 * @route /api/v1/tasks
 */
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await TaskModel.find({ owner: (req as any).user._id });

    if (tasks.length === 0) {
      return res.status(404).json({ message: 'no tasks found' });
    }

    res.status(200).json({ message: 'All tasks', tasks });
  } catch (error) {
    res.status(500).json({
      error,
      message: 'Fetching tasks failed'
    });
  }
};

/**
 * @description To get a single task related to a user if taskId is specified
 * @method GET
 * @route /api/v1/tasks/:id
 */
export const getSingleTask = async (req: Request, res: Response) => {
  const _id = req.params.id;

  try {
    const task = await TaskModel.findOne({ _id, owner: (req as any).user._id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Found Task', task });
  } catch (error) {
    res.status(500).json({
      error,
      message: 'Fetching task failed'
    });
  }
};

/**
 * @description To update a single task related to a user if taskId is specified
 * @method PATCH
 * @route /api/v1/tasks/:id
 */
export const updateTaskStatus = async (req: Request, res: Response) => {
  const _id = req.params.id;

  try {
    const updatedTask = await TaskModel.findOneAndUpdate(
      { _id, owner: (req as any).user._id },
      req.body,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Updated Task', updatedTask });
  } catch (error) {
    res.status(500).json({
      error,
      message: 'Update task status failed'
    });
  }
};

/**
 * @description To delete a single task related to a user if taskId is specified
 * @method DELETE
 * @route /api/v1/tasks/:id
 */
export const deleteTask = async (req: Request, res: Response) => {
  const _id = req.params.id;

  try {
    const deletedTask = await TaskModel.findOneAndDelete({
      _id,
      owner: (req as any).user._id
    });

    if (!deletedTask) {
      return res
        .status(404)
        .json({ message: 'Task not found! Nothing to delete' });
    }

    res
      .status(200)
      .json({ message: 'Task Deleted Successfully!', deletedTask });
  } catch (error) {
    res.status(500).json({
      error,
      message: 'Task Deletion failed'
    });
  }
};
