import { Request, Response } from 'express';
import { TaskModel } from '../models/task.model';
import { CustomRequestType } from '../middlewares/auth';

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
