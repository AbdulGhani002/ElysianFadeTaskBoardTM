const mongoose = require('mongoose');
const { performance } = require('perf_hooks');
const TaskService = require('../services/TaskService');
const UserService = require('../services/UserService');

describe('Load Tests', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test('TaskService.createTask load test', async () => {
    const taskData = {
      title: 'Load Test Task',
      description: 'This is a load test task',
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
    for (let i = 0; i < 1000; i++) {
      await TaskService.createTask(taskData);
    }
    const end = performance.now();

    const duration = end - start;
    console.log(`TaskService.createTask load test took ${duration} ms`);
    expect(duration).toBeLessThan(10000);
  });

  test('UserService.register load test', async () => {
    const userData = {
      name: 'Load Test User',
      email: 'loadtest@test.com',
      password: 'password123',
      role: 'User',
    };

    const start = performance.now();
    for (let i = 0; i < 1000; i++) {
      await UserService.register(userData);
    }
    const end = performance.now();

    const duration = end - start;
    console.log(`UserService.register load test took ${duration} ms`);
    expect(duration).toBeLessThan(20000);
  });
});
