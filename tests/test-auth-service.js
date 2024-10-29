const AuthService = require('../services/AuthService');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

describe('AuthService', () => {
  describe('authenticate', () => {
    it('should authenticate a user with valid credentials', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hashedPassword });
      await user.save();

      const token = await AuthService.authenticate(email, password);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      expect(decoded.userId).toBe(user._id.toString());
    });

    it('should throw an error for invalid credentials', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hashedPassword });
      await user.save();

      await expect(AuthService.authenticate(email, 'wrongpassword')).rejects.toThrow('Invalid credentials');
    });

    it('should throw an error for non-existent user', async () => {
      await expect(AuthService.authenticate('nonexistent@example.com', 'password123')).rejects.toThrow('User not found');
    });
  });

  describe('authorize', () => {
    it('should authorize a user with a valid token', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hashedPassword });
      await user.save();

      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);
      const authorizedUser = await AuthService.authorize(token);

      expect(authorizedUser._id.toString()).toBe(user._id.toString());
    });

    it('should throw an error for an invalid token', async () => {
      const invalidToken = 'invalidtoken';
      await expect(AuthService.authorize(invalidToken)).rejects.toThrow('Unauthorized');
    });

    it('should throw an error for a non-existent user', async () => {
      const token = jwt.sign({ userId: 'nonexistentuserid', role: 'user' }, process.env.JWT_SECRET);
      await expect(AuthService.authorize(token)).rejects.toThrow('User not found');
    });
  });

  describe('checkPermissions', () => {
    it('should return true for a user with sufficient permissions', async () => {
      const user = { role: 'admin' };
      const requiredRole = 'admin';
      const result = await AuthService.checkPermissions(user, requiredRole);

      expect(result).toBe(true);
    });

    it('should throw an error for a user with insufficient permissions', async () => {
      const user = { role: 'user' };
      const requiredRole = 'admin';
      await expect(AuthService.checkPermissions(user, requiredRole)).rejects.toThrow('Insufficient permissions');
    });
  });

  describe('storeSessionData', () => {
    it('should store user data in the session', async () => {
      const req = { session: {} };
      const user = { _id: 'userid', name: 'Test User', email: 'test@example.com', role: 'user' };
      await AuthService.storeSessionData(req, user);

      expect(req.session.user).toEqual({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      });
    });
  });

  describe('getSessionData', () => {
    it('should return user data from the session', async () => {
      const req = { session: { user: { id: 'userid', name: 'Test User', email: 'test@example.com', role: 'user' } } };
      const sessionData = await AuthService.getSessionData(req);

      expect(sessionData).toEqual(req.session.user);
    });
  });

  describe('clearSessionData', () => {
    it('should clear user data from the session', async () => {
      const req = { session: { destroy: jest.fn() } };
      await AuthService.clearSessionData(req);

      expect(req.session.destroy).toHaveBeenCalled();
    });
  });
});
