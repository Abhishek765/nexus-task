import express from 'express';
import { login, logout, register } from '../controllers/user.controller';
import { validateData } from '../middlewares/fieldsValidation';
import { userLoginSchema, userRegistrationSchema } from '../schema/userSchema';
import { verifyUserToken } from '../middlewares/auth';

const router = express.Router();

router.route('/register').post(validateData(userRegistrationSchema), register);

router.route('/login').post(validateData(userLoginSchema), login);

router
  .route('/logout')
  .post(verifyUserToken, validateData(userLoginSchema), logout);

export { router as userRouter };
