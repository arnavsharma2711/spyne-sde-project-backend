import { z } from 'zod';
import { passwordSchema } from './common.schema';

export const createUserSchema = z.object({
  full_name: z.string(),
  email: z.string(),
  password: passwordSchema,
  phone_number: z.string(),
});

export const updateUserInfoSchema = z.object({
  id: z.number(),
  email: z.string(),
  full_name: z.string(),
  phone_number: z.string(),
});

export const passwordUpdateSchema = z.object({
  old_password: z.string({
    required_error: 'Old password is required.',
    invalid_type_error: 'Old password must be a text.',
  }),
  new_password: passwordSchema,
});

export const userIdSchema = z.object({
  id: z.number(),
});

export const userSearchParamsSchema = z.object({
  q: z.string(),
  page: z.number().optional(),
  limit: z.number().optional(),
  sort_by: z.enum(['id', 'full_name', 'email', 'phone_number', 'created_at', 'updated_at']).optional(),
  order_by: z.enum(['asc', 'desc']).optional(),
});
