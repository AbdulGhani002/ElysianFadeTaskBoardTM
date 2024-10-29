const GoalService = require('../services/GoalService');
const Goal = require('../models/Goal');
const mongoose = require('mongoose');

describe('GoalService', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('createGoal', () => {
    it('should create a new goal', async () => {
      const goalData = {
        title: 'Test Goal',
        description: 'Test Description',
        dueDate: new Date(),
        priority: 'high',
        status: 'pending',
        createdBy: new mongoose.Types.ObjectId(),
        assignees: [new mongoose.Types.ObjectId()],
      };

      const goal = await GoalService.createGoal(goalData);
      expect(goal).toHaveProperty('_id');
      expect(goal.title).toBe(goalData.title);
    });
  });

  describe('getGoals', () => {
    it('should return all goals', async () => {
      const goals = await GoalService.getGoals();
      expect(Array.isArray(goals)).toBe(true);
    });
  });

  describe('getGoalById', () => {
    it('should return a goal by id', async () => {
      const goalData = {
        title: 'Test Goal',
        description: 'Test Description',
        dueDate: new Date(),
        priority: 'high',
        status: 'pending',
        createdBy: new mongoose.Types.ObjectId(),
        assignees: [new mongoose.Types.ObjectId()],
      };

      const createdGoal = await GoalService.createGoal(goalData);
      const goal = await GoalService.getGoalById(createdGoal._id);
      expect(goal).toHaveProperty('_id');
      expect(goal.title).toBe(goalData.title);
    });
  });

  describe('updateGoal', () => {
    it('should update a goal', async () => {
      const goalData = {
        title: 'Test Goal',
        description: 'Test Description',
        dueDate: new Date(),
        priority: 'high',
        status: 'pending',
        createdBy: new mongoose.Types.ObjectId(),
        assignees: [new mongoose.Types.ObjectId()],
      };

      const createdGoal = await GoalService.createGoal(goalData);
      const updatedData = { title: 'Updated Goal' };
      const updatedGoal = await GoalService.updateGoal(createdGoal._id, updatedData);
      expect(updatedGoal.title).toBe(updatedData.title);
    });
  });

  describe('deleteGoal', () => {
    it('should delete a goal', async () => {
      const goalData = {
        title: 'Test Goal',
        description: 'Test Description',
        dueDate: new Date(),
        priority: 'high',
        status: 'pending',
        createdBy: new mongoose.Types.ObjectId(),
        assignees: [new mongoose.Types.ObjectId()],
      };

      const createdGoal = await GoalService.createGoal(goalData);
      const deletedGoal = await GoalService.deleteGoal(createdGoal._id);
      expect(deletedGoal).toHaveProperty('_id');
      const goal = await GoalService.getGoalById(createdGoal._id);
      expect(goal).toBeNull();
    });
  });
});
