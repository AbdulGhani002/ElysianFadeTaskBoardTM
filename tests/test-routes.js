const request = require('supertest');
const express = require('express');
const baseRoutes = require('../routes/baseRoutes');
const goalRoutes = require('../routes/goalRoutes');
const notificationRoutes = require('../routes/notificationRoutes');
const taskRoutes = require('../routes/taskRoutes');
const teamRoutes = require('../routes/teamRoutes');
const userRoutes = require('../routes/userRoutes');

const app = express();
app.use(express.json());
app.use('/', baseRoutes);
app.use('/goals', goalRoutes);
app.use('/notifications', notificationRoutes);
app.use('/tasks', taskRoutes);
app.use('/teams', teamRoutes);
app.use('/users', userRoutes);

describe('Integration Tests for Routes', () => {
  it('should return 200 for GET /', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
  });

  it('should return 200 for GET /goals', async () => {
    const res = await request(app).get('/goals');
    expect(res.statusCode).toEqual(200);
  });

  it('should return 200 for GET /settings', async () => {
    const res = await request(app).get('/settings');
    expect(res.statusCode).toEqual(200);
  });

  it('should return 200 for GET /analytics', async () => {
    const res = await request(app).get('/analytics');
    expect(res.statusCode).toEqual(200);
  });

  it('should return 200 for GET /tasks', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toEqual(200);
  });

  it('should return 200 for GET /teams', async () => {
    const res = await request(app).get('/teams');
    expect(res.statusCode).toEqual(200);
  });

  it('should return 200 for GET /users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toEqual(200);
  });
});
