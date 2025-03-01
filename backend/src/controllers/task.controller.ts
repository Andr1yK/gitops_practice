import { Response, NextFunction } from 'express';
import { prisma } from '../index';
import { AuthRequest, CreateTaskInput, UpdateTaskInput } from '../types';
import { AppError } from '../middlewares/error.middleware';

export const getAllTasks = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new AppError('User not authenticated', 401);
    }

    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' }
    });

    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new AppError('User not authenticated', 401);
    }

    const taskId = parseInt(req.params.id);
    if (isNaN(taskId)) {
      throw new AppError('Invalid task ID', 400);
    }

    const task = await prisma.task.findUnique({
      where: { id: taskId }
    });

    if (!task) {
      throw new AppError('Task not found', 404);
    }

    if (task.userId !== userId) {
      throw new AppError('You do not have permission to access this task', 403);
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
};

export const createTask = async (
  req: AuthRequest & { body: CreateTaskInput },
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new AppError('User not authenticated', 401);
    }

    const { title, description, category, status } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        category,
        status,
        userId
      }
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (
  req: AuthRequest & { body: UpdateTaskInput },
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new AppError('User not authenticated', 401);
    }

    const taskId = parseInt(req.params.id);
    if (isNaN(taskId)) {
      throw new AppError('Invalid task ID', 400);
    }

    // Check if task exists and belongs to user
    const existingTask = await prisma.task.findUnique({
      where: { id: taskId }
    });

    if (!existingTask) {
      throw new AppError('Task not found', 404);
    }

    if (existingTask.userId !== userId) {
      throw new AppError('You do not have permission to update this task', 403);
    }

    const { title, description, category, status } = req.body;

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        title,
        description,
        category,
        status
      }
    });

    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new AppError('User not authenticated', 401);
    }

    const taskId = parseInt(req.params.id);
    if (isNaN(taskId)) {
      throw new AppError('Invalid task ID', 400);
    }

    // Check if task exists and belongs to user
    const existingTask = await prisma.task.findUnique({
      where: { id: taskId }
    });

    if (!existingTask) {
      throw new AppError('Task not found', 404);
    }

    if (existingTask.userId !== userId) {
      throw new AppError('You do not have permission to delete this task', 403);
    }

    await prisma.task.delete({
      where: { id: taskId }
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};