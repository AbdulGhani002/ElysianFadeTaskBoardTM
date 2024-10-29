const mongoose = require('mongoose');
const Goal = require('../models/Goal');

class GoalService {
  static async createGoal(goalData) {
    try {
      const goal = new Goal(goalData);
      await goal.save();
      return goal;
    } catch (error) {
      throw new Error('Error creating goal: ' + error.message);
    }
  }

  static async getGoals() {
    try {
      const goals = await Goal.find();
      return goals;
    } catch (error) {
      throw new Error('Error fetching goals: ' + error.message);
    }
  }

  static async getGoalById(id) {
    try {
      const goal = await Goal.findById(id);
      if (!goal) {
        throw new Error('Goal not found');
      }
      return goal;
    } catch (error) {
      throw new Error('Error fetching goal: ' + error.message);
    }
  }

  static async updateGoal(id, goalData) {
    try {
      const goal = await Goal.findByIdAndUpdate(id, goalData, { new: true });
      if (!goal) {
        throw new Error('Goal not found');
      }
      return goal;
    } catch (error) {
      throw new Error('Error updating goal: ' + error.message);
    }
  }

  static async deleteGoal(id) {
    try {
      const goal = await Goal.findByIdAndDelete(id);
      if (!goal) {
        throw new Error('Goal not found');
      }
      return goal;
    } catch (error) {
      throw new Error('Error deleting goal: ' + error.message);
    }
  }
}

module.exports = GoalService;
