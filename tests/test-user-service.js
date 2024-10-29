const UserService = require('../services/UserService');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

describe('UserService', () => {
  let user;

  beforeAll(async () => {
    user = new User({
      name: 'Test User',
      email: 'testuser@example.com',
      password: await bcrypt.hash('password', 10),
      role: 'user'
    });
    await user.save();
  });

  afterAll(async () => {
    await User.deleteMany({});
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const newUser = {
        name: 'New User',
        email: 'newuser@example.com',
        password: 'password',
        role: 'user'
      };
      const result = await UserService.register(newUser);
      expect(result).toHaveProperty('_id');
      expect(result.name).toBe(newUser.name);
      expect(result.email).toBe(newUser.email);
    });

    it('should throw an error if email is already taken', async () => {
      const newUser = {
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password',
        role: 'user'
      };
      await expect(UserService.register(newUser)).rejects.toThrow('Email already taken');
    });
  });

  describe('login', () => {
    it('should login a user with valid credentials', async () => {
      const credentials = {
        email: 'testuser@example.com',
        password: 'password'
      };
      const result = await UserService.login(credentials);
      expect(result).toHaveProperty('token');
      const decoded = jwt.verify(result.token, process.env.JWT_SECRET);
      expect(decoded).toHaveProperty('userId', user._id.toString());
    });

    it('should throw an error if email is not found', async () => {
      const credentials = {
        email: 'nonexistent@example.com',
        password: 'password'
      };
      await expect(UserService.login(credentials)).rejects.toThrow('User not found');
    });

    it('should throw an error if password is incorrect', async () => {
      const credentials = {
        email: 'testuser@example.com',
        password: 'wrongpassword'
      };
      await expect(UserService.login(credentials)).rejects.toThrow('Invalid credentials');
    });
  });

  describe('updateProfile', () => {
    it('should update user profile', async () => {
      const updates = {
        name: 'Updated User'
      };
      const result = await UserService.updateProfile(user._id, updates);
      expect(result.name).toBe(updates.name);
    });

    it('should throw an error if user is not found', async () => {
      const updates = {
        name: 'Updated User'
      };
      await expect(UserService.updateProfile('nonexistentId', updates)).rejects.toThrow('User not found');
    });
  });
});
