import mongoose from 'mongoose';
import { DATA_MODEL_KEYS } from '../constants';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['TODO', 'IN_PROGRESS', 'DONE'],
      default: 'TODO'
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: DATA_MODEL_KEYS.User
    }
  },
  { timestamps: true }
);

export const TaskModel = mongoose.model(DATA_MODEL_KEYS.Task, taskSchema);
