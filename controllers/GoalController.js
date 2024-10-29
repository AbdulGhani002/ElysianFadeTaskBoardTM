const Goal = require('../models/Goal');
const GoalService = require('../services/GoalService');

class GoalController {
  static async createGoal(req, res) {
    try {
      const goal = await GoalService.createGoal(req.body);
      res.status(201).json(goal);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getGoals(req, res) {
    try {
      const goals = await GoalService.getGoals();
      res.status(200).json(goals);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getGoalById(req, res) {
    try {
      const goal = await GoalService.getGoalById(req.params.id);
      if (!goal) {
        return res.status(404).json({ error: 'Goal not found' });
      }
      res.status(200).json(goal);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateGoal(req, res) {
    try {
      const goal = await GoalService.updateGoal(req.params.id, req.body);
      if (!goal) {
        return res.status(404).json({ error: 'Goal not found' });
      }
      res.status(200).json(goal);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteGoal(req, res) {
    try {
      const goal = await GoalService.deleteGoal(req.params.id);
      if (!goal) {
        return res.status(404).json({ error: 'Goal not found' });
      }
      res.status(200).json({ message: 'Goal deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = GoalController;
