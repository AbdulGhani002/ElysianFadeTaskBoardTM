const express = require('express');
const TaskController = require('../controllers/TaskController');

const router = express.Router();

router.post('/tasks', TaskController.createTask);
router.get('/tasks', TaskController.getTasks);
router.get('/tasks/:id', TaskController.getTaskById);
router.put('/tasks/:id', TaskController.updateTask);
router.delete('/tasks/:id', TaskController.deleteTask);

module.exports = router;
