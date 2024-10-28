import { Router } from 'https://deno.land/x/oak/mod.ts';
import TaskController from '../controllers/TaskController.ts';

const router = new Router();

router.post('/tasks', TaskController.createTask);
router.get('/tasks', TaskController.getTasks);
router.get('/tasks/:id', TaskController.getTaskById);
router.put('/tasks/:id', TaskController.updateTask);
router.delete('/tasks/:id', TaskController.deleteTask);

export default router;
