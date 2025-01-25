import { PrismaClient } from '@prisma/client';
import { CreateTaskDTO, UpdateTaskDTO } from '../schemas/task.schema';

export class TaskService {
  constructor(private prisma: PrismaClient) {}

  // Get all tasks ordered by creation date (desc: descending order)
  async getAllTasks() {
    return this.prisma.task.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // Create a new task with provided data
  async createTask(data: CreateTaskDTO) {
    return this.prisma.task.create({
      data,
    });
  }

  // Update an existing task by ID with the provided data
  async updateTask(id: string, data: UpdateTaskDTO) {
    return this.prisma.task.update({
      where: { id },
      data,
    });
  }

  // Delete a task by ID
  async deleteTask(id: string) {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
