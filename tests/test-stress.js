const request = require('supertest');
const app = require('../app');

describe('Stress Tests', () => {
  it('should handle a large number of simultaneous requests', async () => {
    const numRequests = 1000;
    const requests = [];

    for (let i = 0; i < numRequests; i++) {
      requests.push(request(app).get('/'));
    }

    const responses = await Promise.all(requests);

    responses.forEach(response => {
      expect(response.status).toBe(200);
    });
  });

  it('should handle high load on the database', async () => {
    const numRequests = 1000;
    const requests = [];

    for (let i = 0; i < numRequests; i++) {
      requests.push(request(app).post('/tasks').send({
        title: `Task ${i}`,
        description: `Description for task ${i}`,
        dueDate: new Date(),
        priority: 'High',
        status: 'Pending',
        category: 'Work',
        isRecurring: false,
        tags: [],
        createdBy: 'userId',
        assignees: []
      }));
    }

    const responses = await Promise.all(requests);

    responses.forEach(response => {
      expect(response.status).toBe(201);
    });
  });
});
