const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/User');
const Task = require('../models/Task');
const Goal = require('../models/Goal');
const Team = require('../models/Team');

describe('End-to-End Tests', () => {
  let server;
  let userToken;

  beforeAll(async () => {
    server = app.listen(4000);
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create a test user and get a token
    const user = new User({
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'password123',
      role: 'User',
    });
    await user.save();

    const response = await request(app)
      .post('/login')
      .send({ email: 'testuser@example.com', password: 'password123' });

    userToken = response.body.token;
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Task.deleteMany({});
    await Goal.deleteMany({});
    await Team.deleteMany({});
    await mongoose.connection.close();
    server.close();
  });

  test('Create and retrieve a task', async () => {
    const taskData = {
      title: 'Test Task',
      description: 'This is a test task',
      dueDate: '2023-12-31',
      priority: 'High',
      status: 'Pending',
      category: 'Work',
      isRecurring: false,
      createdBy: 'testuser@example.com',
    };

    const createResponse = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${userToken}`)
      .send(taskData);

    expect(createResponse.status).toBe(201);
    expect(createResponse.body.title).toBe('Test Task');

    const getResponse = await request(app)
      .get(`/tasks/${createResponse.body._id}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(getResponse.status).toBe(200);
    expect(getResponse.body.title).toBe('Test Task');
  });

  test('Create and retrieve a goal', async () => {
    const goalData = {
      title: 'Test Goal',
      description: 'This is a test goal',
      dueDate: '2023-12-31',
      createdBy: 'testuser@example.com',
    };

    const createResponse = await request(app)
      .post('/goals')
      .set('Authorization', `Bearer ${userToken}`)
      .send(goalData);

    expect(createResponse.status).toBe(201);
    expect(createResponse.body.title).toBe('Test Goal');

    const getResponse = await request(app)
      .get(`/goals/${createResponse.body._id}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(getResponse.status).toBe(200);
    expect(getResponse.body.title).toBe('Test Goal');
  });

  test('Create and retrieve a team', async () => {
    const teamData = {
      teamName: 'Test Team',
      members: [],
      permissions: [],
    };

    const createResponse = await request(app)
      .post('/teams')
      .set('Authorization', `Bearer ${userToken}`)
      .send(teamData);

    expect(createResponse.status).toBe(201);
    expect(createResponse.body.teamName).toBe('Test Team');

    const getResponse = await request(app)
      .get(`/teams/${createResponse.body._id}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(getResponse.status).toBe(200);
    expect(getResponse.body.teamName).toBe('Test Team');
  });
});
