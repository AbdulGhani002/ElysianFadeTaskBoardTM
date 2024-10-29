const request = require('supertest');
const express = require('express');
const app = require('../app');

describe('Error Handling', () => {
  it('should return 500 and render ErrorPage for server errors', async () => {
    const res = await request(app)
      .get('/error')
      .expect(500);

    expect(res.text).toContain('Oops! Something went wrong.');
  });

  it('should return 401 and render ErrorPage for unauthorized access', async () => {
    const res = await request(app)
      .get('/unauthorized')
      .expect(401);

    expect(res.text).toContain('Unauthorized');
  });

  it('should return 404 and render ErrorPage for not found routes', async () => {
    const res = await request(app)
      .get('/nonexistent')
      .expect(404);

    expect(res.text).toContain('Not Found');
  });
});
