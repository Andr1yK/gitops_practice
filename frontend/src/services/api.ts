import axios from 'axios';

const API_URL = '/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API
export const authAPI = {
  // Register a new user
  register: async (name: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },

  // Login user
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  // Get user profile
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

// Task Types
export interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  category?: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  status?: 'TODO' | 'IN_PROGRESS' | 'DONE';
  category?: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: 'TODO' | 'IN_PROGRESS' | 'DONE';
  category?: string;
}

// Tasks API
export const tasksAPI = {
  // Get all tasks
  getAllTasks: async () => {
    const response = await api.get('/tasks');
    return response.data as Task[];
  },

  // Get task by id
  getTaskById: async (id: number) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data as Task;
  },

  // Create a new task
  createTask: async (data: CreateTaskInput) => {
    const response = await api.post('/tasks', data);
    return response.data as Task;
  },

  // Update task
  updateTask: async (id: number, data: UpdateTaskInput) => {
    const response = await api.put(`/tasks/${id}`, data);
    return response.data as Task;
  },

  // Delete task
  deleteTask: async (id: number) => {
    await api.delete(`/tasks/${id}`);
  },
};

export default api;
