export interface Task {
  id: string;
  title: string;
  color: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskInput {
  title: string;
  color?: string;
}

export interface UpdateTaskInput {
  title?: string;
  color?: string;
  completed?: boolean;
}
