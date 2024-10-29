const { performance } = require('perf_hooks');
const mongoose = require('mongoose');
const TaskService = require('../services/TaskService');
const UserService = require('../services/UserService');

describe('Performance Tests', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test('TaskService.createTask performance', async () => {
    const taskData = {
      title: 'Performance Test Task',
      description: 'This is a performance test task',
      dueDate: new Date(),
      priority: 'High',
      status: 'Pending',
      category: 'Test',
      isRecurring: false,
      tags: [],
      createdBy: mongoose.Types.ObjectId(),
      assignees: [],
    };

    const start = performance.now();
    await TaskService.createTask(taskData);
    const end = performance.now();

    const duration = end - start;
    console.log(`TaskService.createTask took ${duration} ms`);
    expect(duration).toBeLessThan(100);
  });

  test('UserService.register performance', async () => {
    const userData = {
      name: 'Performance Test User',
      email: 'performance@test.com',
      password: 'password123',
      role: 'User',
    };

    const start = performance.now();
    await UserService.register(userData);
    const end = performance.now();

    const duration = end - start;
    console.log(`UserService.register took ${duration} ms`);
    expect(duration).toBeLessThan(200);
  });
});
