import express from 'express';
import { login, register } from '../controllers/user.controller';
import { validateData } from '../middlewares/fieldsValidation';
import { userLoginSchema, userRegistrationSchema } from '../schema/userSchema';

const router = express.Router();

router.route('/register').post(validateData(userRegistrationSchema), register);
router.route('/login').post(validateData(userLoginSchema), login);

export { router as userRouter };
