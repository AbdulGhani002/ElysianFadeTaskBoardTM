const TaskService = require('../services/TaskService');

class TaskController {
  static async createTask(req, res) {
    try {
      const task = await TaskService.createTask(req.body);
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getTasks(req, res) {
    try {
      const tasks = await TaskService.getTasks();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getTaskById(req, res) {
    try {
      const task = await TaskService.getTaskById(req.params.id);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateTask(req, res) {
    try {
      const task = await TaskService.updateTask(req.params.id, req.body);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteTask(req, res) {
    try {
      const task = await TaskService.deleteTask(req.params.id);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = TaskController;
