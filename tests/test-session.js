const request = require('supertest');
const express = require('express');
const session = require('express-session');
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

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await AuthService.authenticate(email, password);
    req.session.token = token;
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

app.use((req, res, next) => {
  if (req.session.token) {
    AuthService.authorize(req.session.token)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(error => {
        res.status(401).json({ error: 'Unauthorized' });
      });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

describe('Session Management', () => {
  it('should create a session on login', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'test@example.com', password: 'password' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Login successful');
    expect(response.headers['set-cookie']).toBeDefined();
  });

  it('should authorize a user with a valid session', async () => {
    const loginResponse = await request(app)
      .post('/login')
      .send({ email: 'test@example.com', password: 'password' });

    const cookie = loginResponse.headers['set-cookie'];

    const authResponse = await request(app)
      .get('/protected-route')
      .set('Cookie', cookie);

    expect(authResponse.status).toBe(200);
    expect(authResponse.body.user).toBeDefined();
  });

  it('should return unauthorized for a user without a session', async () => {
    const response = await request(app)
      .get('/protected-route');

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Unauthorized');
  });
});
