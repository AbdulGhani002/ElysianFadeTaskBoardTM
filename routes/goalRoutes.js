const express = require('express');
const router = express.Router();
const GoalController = require('../controllers/GoalController');

router.post('/', GoalController.createGoal);
router.get('/', GoalController.getGoals);
router.get('/:id', GoalController.getGoalById);
router.put('/:id', GoalController.updateGoal);
router.delete('/:id', GoalController.deleteGoal);

module.exports = router;
