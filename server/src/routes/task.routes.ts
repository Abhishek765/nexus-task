import express from 'express';
import { verifyUserToken } from '../middlewares/auth';
import {
  createTask,
  deleteTask,
  getAllTasks,
  getSingleTask,
  updateTaskStatus
} from '../controllers/task.controller';
import { validateData } from '../middlewares/fieldsValidation';
import { createTaskSchema, updateTaskStatusSchema } from '../schema/taskSchema';

const router = express.Router();

router
  .route('/')
  .post(verifyUserToken, validateData(createTaskSchema), createTask);

router.route('/').get(verifyUserToken, getAllTasks);

router.route('/:id').get(verifyUserToken, getSingleTask);

router
  .route('/:id')
  .patch(
    verifyUserToken,
    validateData(updateTaskStatusSchema),
    updateTaskStatus
  );

router.route('/:id').delete(verifyUserToken, deleteTask);

export { router as taskRouter };
