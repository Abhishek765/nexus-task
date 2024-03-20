import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(1, 'To short title'),
  description: z.string().min(1, 'To short description'),
  status: z
    .union([z.literal('TODO'), z.literal('IN_PROGRESS'), z.literal('DONE')])
    .optional()
});
