import { RequestHandler } from 'express';
import { TaskService } from '../services/task.service';
import { PrismaClient } from '@prisma/client';
import { CreateTaskDTO, UpdateTaskDTO } from '../schemas/task.schema';

// Initialize Prisma client and Task service
const prisma = new PrismaClient();
const taskService = new TaskService(prisma);

// Get all tasks
export const getTasks: RequestHandler = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks(); // Fetch all tasks
    res.json(tasks); // Return tasks as JSON
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks' }); // Handle errors
  }
};

// Create a new task
export const createTask: RequestHandler<{}, {}, CreateTaskDTO> = async (
  req,
  res
) => {
  try {
    const task = await taskService.createTask(req.body); // Create a task using request body
    res.status(201).json(task); // Respond with the created task
  } catch (error) {
    res.status(500).json({ error: 'Error creating task' }); // Handle errors
  }
};

// Update an existing task
export const updateTask: RequestHandler<
  { id: string },
  {},
  UpdateTaskDTO
> = async (req, res) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body); // Update task by ID
    res.json(task); // Respond with the updated task
  } catch (error) {
    res.status(500).json({ error: 'Error updating task' }); // Handle errors
  }
};

// Delete a task by ID
export const deleteTask: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    await taskService.deleteTask(req.params.id); // Delete task by ID
    res
      .status(200)
      .json({ message: `Deleted ${req.params.id} task successfully` }); // Success message
  } catch (error) {
    res.status(500).json({ error: 'Error deleting task' }); // Handle errors
  }
};
