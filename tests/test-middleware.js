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

app.get('/protected', (req, res) => {
  res.status(200).json({ message: 'Protected route accessed' });
});

describe('Middleware Tests', () => {
  it('should return 401 if no token is provided', async () => {
    const response = await request(app).get('/protected');
    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Unauthorized');
  });

  it('should return 401 if token is invalid', async () => {
    const response = await request(app)
      .get('/protected')
      .set('Cookie', ['connect.sid=invalid_token']);
    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Unauthorized');
  });

  it('should return 200 if token is valid', async () => {
    const token = 'valid_token';
    jest.spyOn(AuthService, 'authorize').mockResolvedValue({ id: 'user_id', name: 'Test User' });

    const response = await request(app)
      .get('/protected')
      .set('Cookie', [`connect.sid=${token}`]);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Protected route accessed');
  });
});
