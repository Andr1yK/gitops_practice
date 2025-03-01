import { Request } from 'express';
import { TaskStatus, User } from '@prisma/client';

export interface AuthRequest extends Request {
  user?: User;
}

export interface CreateUserInput {
  email: string;
  password: string;
  name?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  category?: string;
  status?: TaskStatus;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  category?: string;
  status?: TaskStatus;
}