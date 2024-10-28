import { Router } from 'https://deno.land/x/oak/mod.ts';
import GoalController from '../controllers/GoalController.ts';

const router = new Router();

router.post('/goals', GoalController.createGoal);
router.get('/goals', GoalController.getGoals);
router.get('/goals/:id', GoalController.getGoalById);
router.put('/goals/:id', GoalController.updateGoal);
router.delete('/goals/:id', GoalController.deleteGoal);

export default router;
