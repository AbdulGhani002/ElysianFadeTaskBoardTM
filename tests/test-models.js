const mongoose = require('mongoose');
const Goal = require('../models/Goal');
const Subtask = require('../models/Subtask');
const Tag = require('../models/Tag');
const Task = require('../models/Task');
const User = require('../models/User');

describe('Model Tests', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('Goal Model', () => {
    it('should create and save a goal successfully', async () => {
      const goalData = {
        title: 'Test Goal',
        description: 'Test Description',
        dueDate: new Date(),
        priority: 'high',
        status: 'pending',
        createdBy: new mongoose.Types.ObjectId(),
        assignees: [new mongoose.Types.ObjectId()],
      };
      const goal = new Goal(goalData);
      const savedGoal = await goal.save();
      expect(savedGoal._id).toBeDefined();
      expect(savedGoal.title).toBe(goalData.title);
    });
  });

  describe('Subtask Model', () => {
    it('should create and save a subtask successfully', async () => {
      const subtaskData = {
        title: 'Test Subtask',
        description: 'Test Description',
        status: 'pending',
        parentTaskId: new mongoose.Types.ObjectId(),
        dueDate: new Date(),
        priority: 'medium',
      };
      const subtask = new Subtask(subtaskData);
      const savedSubtask = await subtask.save();
      expect(savedSubtask._id).toBeDefined();
      expect(savedSubtask.title).toBe(subtaskData.title);
    });
  });

  describe('Tag Model', () => {
    it('should create and save a tag successfully', async () => {
      const tagData = {
        name: 'Test Tag',
        color: '#FFFFFF',
        description: 'Test Description',
      };
      const tag = new Tag(tagData);
      const savedTag = await tag.save();
      expect(savedTag._id).toBeDefined();
      expect(savedTag.name).toBe(tagData.name);
    });
  });

  describe('Task Model', () => {
    it('should create and save a task successfully', async () => {
      const taskData = {
        title: 'Test Task',
        description: 'Test Description',
        dueDate: new Date(),
        priority: 'low',
        status: 'pending',
        category: 'Test Category',
        isRecurring: false,
        tags: [new mongoose.Types.ObjectId()],
        createdBy: new mongoose.Types.ObjectId(),
        assignees: [new mongoose.Types.ObjectId()],
        subtasks: [new mongoose.Types.ObjectId()],
      };
      const task = new Task(taskData);
      const savedTask = await task.save();
      expect(savedTask._id).toBeDefined();
      expect(savedTask.title).toBe(taskData.title);
    });
  });

  describe('User Model', () => {
    it('should create and save a user successfully', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'user',
      };
      const user = new User(userData);
      const savedUser = await user.save();
      expect(savedUser._id).toBeDefined();
      expect(savedUser.email).toBe(userData.email);
    });
  });
});
