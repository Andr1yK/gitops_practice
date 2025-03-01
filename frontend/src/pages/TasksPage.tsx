import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { tasksAPI, Task as ApiTask, CreateTaskInput, UpdateTaskInput } from '../services/api';
import '../styles/TasksPage.css';

// Ensure our Task type matches the API
type Task = ApiTask;

const TasksPage = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateTaskInput>({
    title: '',
    description: '',
  });

  // Load tasks from API
  useEffect(() => {
    const loadTasks = async () => {
      try {
        // If not authenticated, redirect to login
        if (!authLoading && !isAuthenticated) {
          navigate('/login');
          return;
        }

        if (isAuthenticated) {
          const data = await tasksAPI.getAllTasks();
          setTasks(data);
        }
      } catch (err: any) {
        console.error('Error loading tasks:', err);
        setError(err.response?.data?.message || 'Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [isAuthenticated, authLoading, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title?.trim()) {
      setError('Title is required');
      return;
    }
    
    try {
      // Create task via API
      const newTask = await tasksAPI.createTask({
        ...formData,
        status: 'TODO'
      });
      
      // Add to state
      setTasks([newTask, ...tasks]);
      setFormData({ title: '', description: '' });
      setError(null);
    } catch (err: any) {
      console.error('Error creating task:', err);
      setError(err.response?.data?.message || 'Failed to create task');
    }
  };

  const handleStatusChange = async (taskId: number, status: 'todo' | 'in_progress' | 'completed') => {
    try {
      // Update via API
      await tasksAPI.updateTask(taskId, { status });
      
      // Update state
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, status } : task
      ));
    } catch (err: any) {
      console.error('Error updating task:', err);
      setError(err.response?.data?.message || 'Failed to update task');
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'todo': return 'status-todo';
      case 'in_progress': return 'status-progress';
      case 'completed': return 'status-completed';
      default: return '';
    }
  };

  if (loading) {
    return <div className="container loading">Loading tasks...</div>;
  }

  return (
    <div className="container tasks-page">
      <h1>My Tasks</h1>
      
      <section className="section">
        <h2>Add New Task</h2>
        <form className="task-form" onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter task description"
              rows={3}
            />
          </div>
          
          <button type="submit" className="btn btn-success">Add Task</button>
        </form>
      </section>
      
      <section className="section">
        <h2>Task List</h2>
        {tasks.length === 0 ? (
          <div className="no-tasks">No tasks found. Create a new task to get started!</div>
        ) : (
          <div className="task-list">
            {tasks.map(task => (
              <div key={task.id} className="task-card">
                <div className="task-header">
                  <h3>{task.title}</h3>
                  <span className={`task-status ${getStatusClass(task.status)}`}>
                    {task.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="task-description">{task.description}</p>
                <div className="task-actions">
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task.id, e.target.value as any)}
                    className="status-select"
                  >
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default TasksPage;