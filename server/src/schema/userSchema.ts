import { z } from 'zod';

export const userRegistrationSchema = z.object({
  name: z.string(),
  email: z.string().email('This is not a valid email address!'),
  password: z.string().min(6)
});

export const userLoginSchema = z.object({
  email: z.string().email('This is not a valid email address!'),
  password: z.string().min(6)
});
