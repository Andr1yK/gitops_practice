import { useState, useEffect } from 'react';
import '../styles/TasksPage.css';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'completed';
  createdAt: string;
}

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  // Mock data instead of API calls for now
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockTasks = [
        {
          id: 1,
          title: 'Complete project setup',
          description: 'Initialize the project structure and install dependencies',
          status: 'completed',
          createdAt: '2023-04-01T10:00:00Z',
        },
        {
          id: 2,
          title: 'Create frontend components',
          description: 'Design and implement UI components for the application',
          status: 'in_progress',
          createdAt: '2023-04-02T14:30:00Z',
        },
        {
          id: 3,
          title: 'Connect to backend API',
          description: 'Set up API service and connect frontend to backend',
          status: 'todo',
          createdAt: '2023-04-03T09:15:00Z',
        },
      ] as Task[];
      
      setTasks(mockTasks);
      setLoading(false);
    }, 1000);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    
    // Create a new task (mock implementation)
    const newTask: Task = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      status: 'todo',
      createdAt: new Date().toISOString(),
    };
    
    setTasks([...tasks, newTask]);
    setFormData({ title: '', description: '' });
    setError(null);
  };

  const handleStatusChange = (taskId: number, status: 'todo' | 'in_progress' | 'completed') => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status } : task
    ));
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