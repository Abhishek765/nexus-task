import express from 'express';
import { verifyUserToken } from '../middlewares/auth';
import {
  createTask,
  getAllTasks,
  getSingleTask
} from '../controllers/task.controller';
import { validateData } from '../middlewares/fieldsValidation';
import { createTaskSchema } from '../schema/taskSchema';

const router = express.Router();

router
  .route('/')
  .post(verifyUserToken, validateData(createTaskSchema), createTask);

router.route('/').get(verifyUserToken, getAllTasks);

router.route('/:id').get(verifyUserToken, getSingleTask);

// router.route('/task/:id').patch(verifyUserToken, updateTask);

// router.route('/task/:id').delete(verifyUserToken, deleteTask);

export { router as taskRouter };
