const request = require('supertest');
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const GoalController = require('../controllers/GoalController');
const NotificationController = require('../controllers/NotificationController');
const TaskController = require('../controllers/TaskController');
const TeamController = require('../controllers/TeamController');
const UserController = require('../controllers/UserController');
const AuthService = require('../services/AuthService');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'test_secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.post('/goals', GoalController.createGoal);
app.get('/goals', GoalController.getGoals);
app.get('/goals/:id', GoalController.getGoalById);
app.put('/goals/:id', GoalController.updateGoal);
app.delete('/goals/:id', GoalController.deleteGoal);

app.post('/notifications/taskReminder', NotificationController.sendTaskReminder);
app.post('/notifications/deadlineNotification', NotificationController.sendDeadlineNotification);
app.post('/notifications/notifyTeam', NotificationController.notifyTeam);

app.post('/tasks', TaskController.createTask);
app.get('/tasks', TaskController.getTasks);
app.get('/tasks/:id', TaskController.getTaskById);
app.put('/tasks/:id', TaskController.updateTask);
app.delete('/tasks/:id', TaskController.deleteTask);

app.post('/teams', TeamController.createTeam);
app.post('/teams/addMember', TeamController.addMember);
app.post('/teams/removeMember', TeamController.removeMember);
app.post('/teams/assignRole', TeamController.assignRole);

app.post('/register', UserController.register);
app.post('/login', UserController.login);
app.put('/profile/:userId', UserController.updateProfile);

describe('Integration Tests for Controllers', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('GoalController', () => {
    it('should create a new goal', async () => {
      const response = await request(app)
        .post('/goals')
        .send({ title: 'Test Goal', description: 'Test Description' });
      expect(response.status).toBe(201);
      expect(response.body.title).toBe('Test Goal');
    });

    it('should get all goals', async () => {
      const response = await request(app).get('/goals');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should get a goal by ID', async () => {
      const goal = await request(app)
        .post('/goals')
        .send({ title: 'Test Goal', description: 'Test Description' });
      const response = await request(app).get(`/goals/${goal.body._id}`);
      expect(response.status).toBe(200);
      expect(response.body.title).toBe('Test Goal');
    });

    it('should update a goal', async () => {
      const goal = await request(app)
        .post('/goals')
        .send({ title: 'Test Goal', description: 'Test Description' });
      const response = await request(app)
        .put(`/goals/${goal.body._id}`)
        .send({ title: 'Updated Goal' });
      expect(response.status).toBe(200);
      expect(response.body.title).toBe('Updated Goal');
    });

    it('should delete a goal', async () => {
      const goal = await request(app)
        .post('/goals')
        .send({ title: 'Test Goal', description: 'Test Description' });
      const response = await request(app).delete(`/goals/${goal.body._id}`);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Goal deleted successfully');
    });
  });

  describe('NotificationController', () => {
    it('should send task reminder', async () => {
      const response = await request(app)
        .post('/notifications/taskReminder')
        .send({ taskId: 'testTaskId', userId: 'testUserId' });
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Task reminder sent successfully');
    });

    it('should send deadline notification', async () => {
      const response = await request(app)
        .post('/notifications/deadlineNotification')
        .send({ taskId: 'testTaskId', userId: 'testUserId' });
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Deadline notification sent successfully');
    });

    it('should notify team', async () => {
      const response = await request(app)
        .post('/notifications/notifyTeam')
        .send({ teamId: 'testTeamId', message: 'Test Message' });
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Team notified successfully');
    });
  });

  describe('TaskController', () => {
    it('should create a new task', async () => {
      const response = await request(app)
        .post('/tasks')
        .send({ title: 'Test Task', description: 'Test Description' });
      expect(response.status).toBe(201);
      expect(response.body.title).toBe('Test Task');
    });

    it('should get all tasks', async () => {
      const response = await request(app).get('/tasks');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should get a task by ID', async () => {
      const task = await request(app)
        .post('/tasks')
        .send({ title: 'Test Task', description: 'Test Description' });
      const response = await request(app).get(`/tasks/${task.body._id}`);
      expect(response.status).toBe(200);
      expect(response.body.title).toBe('Test Task');
    });

    it('should update a task', async () => {
      const task = await request(app)
        .post('/tasks')
        .send({ title: 'Test Task', description: 'Test Description' });
      const response = await request(app)
        .put(`/tasks/${task.body._id}`)
        .send({ title: 'Updated Task' });
      expect(response.status).toBe(200);
      expect(response.body.title).toBe('Updated Task');
    });

    it('should delete a task', async () => {
      const task = await request(app)
        .post('/tasks')
        .send({ title: 'Test Task', description: 'Test Description' });
      const response = await request(app).delete(`/tasks/${task.body._id}`);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Task deleted successfully');
    });
  });

  describe('TeamController', () => {
    it('should create a new team', async () => {
      const response = await request(app)
        .post('/teams')
        .send({ teamName: 'Test Team', members: [], permissions: [] });
      expect(response.status).toBe(201);
      expect(response.body.teamName).toBe('Test Team');
    });

    it('should add a member to a team', async () => {
      const team = await request(app)
        .post('/teams')
        .send({ teamName: 'Test Team', members: [], permissions: [] });
      const response = await request(app)
        .post('/teams/addMember')
        .send({ teamId: team.body._id, userId: 'testUserId' });
      expect(response.status).toBe(200);
      expect(response.body.members).toContain('testUserId');
    });

    it('should remove a member from a team', async () => {
      const team = await request(app)
        .post('/teams')
        .send({ teamName: 'Test Team', members: ['testUserId'], permissions: [] });
      const response = await request(app)
        .post('/teams/removeMember')
        .send({ teamId: team.body._id, userId: 'testUserId' });
      expect(response.status).toBe(200);
      expect(response.body.members).not.toContain('testUserId');
    });

    it('should assign a role to a user', async () => {
      const team = await request(app)
        .post('/teams')
        .send({ teamName: 'Test Team', members: ['testUserId'], permissions: [] });
      const response = await request(app)
        .post('/teams/assignRole')
        .send({ teamId: team.body._id, userId: 'testUserId', role: 'Admin' });
      expect(response.status).toBe(200);
      expect(response.body.role).toBe('Admin');
    });
  });

  describe('UserController', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/register')
        .send({ name: 'Test User', email: 'test@example.com', password: 'password', role: 'User' });
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('User registered successfully');
    });

    it('should login a user', async () => {
      await request(app)
        .post('/register')
        .send({ name: 'Test User', email: 'test@example.com', password: 'password', role: 'User' });
      const response = await request(app)
        .post('/login')
        .send({ email: 'test@example.com', password: 'password' });
      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
    });

    it('should update user profile', async () => {
      const user = await request(app)
        .post('/register')
        .send({ name: 'Test User', email: 'test@example.com', password: 'password', role: 'User' });
      const response = await request(app)
        .put(`/profile/${user.body._id}`)
        .send({ name: 'Updated User' });
      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Updated User');
    });
  });
});
