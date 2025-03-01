import express from 'express';
import { 
  createTask, 
  deleteTask, 
  getAllTasks, 
  getTaskById, 
  updateTask 
} from '../controllers/task.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = express.Router();

// Apply authentication middleware to all task routes
router.use(authenticate);

router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;