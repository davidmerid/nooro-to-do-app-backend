import { z } from 'zod';
import { ValidationSchema } from './validation.schema';

// Schema for creating a task
export const createTaskSchema: ValidationSchema = {
  body: z.object({
    title: z.string().min(1, 'Title is required'), // Title is required and must be a non-empty string
    color: z.string().optional().default('gray'), // Color is optional, default is 'gray'
  }),
};

// Schema for updating a task
export const updateTaskSchema: ValidationSchema = {
  params: z.object({
    id: z.string().uuid('Invalid task ID'), // ID must be a valid UUID
  }),
  body: z.object({
    title: z.string().min(1).optional(), // Title is optional but must be a non-empty string if provided
    color: z.string().optional(), // Color is optional
    completed: z.boolean().optional(), // Completed is optional, must be a boolean if provided
  }),
};

// Schema for deleting a task
export const deleteTaskSchema: ValidationSchema = {
  params: z.object({
    id: z.string().uuid('Invalid task ID'), // ID must be a valid UUID
  }),
};

// DTOs inferred from the schemas
export type CreateTaskDTO = z.infer<NonNullable<typeof createTaskSchema.body>>;
export type UpdateTaskDTO = z.infer<NonNullable<typeof updateTaskSchema.body>>;
