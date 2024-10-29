const request = require('supertest');
const app = require('../app');

describe('EJS Views', () => {
  it('should render the HomePage view', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('<title>Elysian Fade Task Board</title>');
  });

  it('should render the GoalPage view', async () => {
    const res = await request(app).get('/goals');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('<title>Goal Tracking</title>');
  });

  it('should render the SettingsPage view', async () => {
    const res = await request(app).get('/settings');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('<title>Settings</title>');
  });

  it('should render the AnalyticsPage view', async () => {
    const res = await request(app).get('/analytics');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('<title>Analytics - Elysian Fade Task Board</title>');
  });

  it('should render the RegisterPage view', async () => {
    const res = await request(app).get('/register');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('<title>Register</title>');
  });

  it('should render the LoginPage view', async () => {
    const res = await request(app).get('/login');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('<title>Login</title>');
  });

  it('should render the ErrorPage view', async () => {
    const res = await request(app).get('/error');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('<title>Error</title>');
  });

  it('should render the SuccessPage view', async () => {
    const res = await request(app).get('/success');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('<title>Success</title>');
  });
});
