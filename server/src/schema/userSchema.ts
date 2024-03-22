import { z } from 'zod';

export const userRegistrationSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6)
});

export const userLoginSchema = z.object({
  email: z.string().email('Invalid Credentials!'),
  password: z.string().min(6, 'Invalid Credentials!')
});
