import { Router } from 'express';
import * as taskController from '../controllers/task.controller';
import { validate } from '../middleware/validate';
import {
  createTaskSchema,
  updateTaskSchema,
  deleteTaskSchema,
} from '../schemas/task.schema';

const router = Router();

// Route to get all tasks
router.get('/', taskController.getTasks);

// Route to create a new task, with validation
router.post('/', validate(createTaskSchema), taskController.createTask);

// Route to update an existing task by ID, with validation
router.put('/:id', validate(updateTaskSchema), taskController.updateTask);

// Route to delete a task by ID, with validation
router.delete('/:id', validate(deleteTaskSchema), taskController.deleteTask);

export default router;
