const TaskService = require('../services/TaskService');
const Task = require('../models/Task');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('TaskService', () => {
  let taskId;

  beforeEach(async () => {
    const task = new Task({
      title: 'Test Task',
      description: 'Test Description',
      dueDate: new Date(),
      priority: 'medium',
      status: 'pending',
      category: 'Test Category',
      isRecurring: false,
      createdBy: new mongoose.Types.ObjectId(),
    });
    await task.save();
    taskId = task._id;
  });

  afterEach(async () => {
    await Task.deleteMany({});
  });

  test('createTask should create a new task', async () => {
    const taskData = {
      title: 'New Task',
      description: 'New Description',
      dueDate: new Date(),
      priority: 'high',
      status: 'in-progress',
      category: 'New Category',
      isRecurring: true,
      createdBy: new mongoose.Types.ObjectId(),
    };
    const task = await TaskService.createTask(taskData);
    expect(task).toHaveProperty('_id');
    expect(task.title).toBe(taskData.title);
  });

  test('getTasks should return all tasks', async () => {
    const tasks = await TaskService.getTasks();
    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe('Test Task');
  });

  test('getTaskById should return a task by ID', async () => {
    const task = await TaskService.getTaskById(taskId);
    expect(task).toHaveProperty('_id', taskId);
  });

  test('updateTask should update a task by ID', async () => {
    const updatedData = { title: 'Updated Task' };
    const task = await TaskService.updateTask(taskId, updatedData);
    expect(task).toHaveProperty('_id', taskId);
    expect(task.title).toBe(updatedData.title);
  });

  test('deleteTask should delete a task by ID', async () => {
    await TaskService.deleteTask(taskId);
    const task = await TaskService.getTaskById(taskId);
    expect(task).toBeNull();
  });
});
