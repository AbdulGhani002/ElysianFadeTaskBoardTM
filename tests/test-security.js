const assert = require('assert');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AuthService = require('../services/AuthService');
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();

describe('Security Tests', () => {
  describe('Password Hashing', () => {
    it('should hash passwords correctly', async () => {
      const password = 'securePassword123';
      const hashedPassword = await bcrypt.hash(password, 10);
      const isMatch = await bcrypt.compare(password, hashedPassword);
      assert.strictEqual(isMatch, true);
    });

    it('should not match incorrect passwords', async () => {
      const password = 'securePassword123';
      const hashedPassword = await bcrypt.hash(password, 10);
      const isMatch = await bcrypt.compare('wrongPassword', hashedPassword);
      assert.strictEqual(isMatch, false);
    });
  });

  describe('JWT Authentication', () => {
    it('should generate a valid JWT token', () => {
      const payload = { userId: '12345', role: 'User' };
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      assert.strictEqual(decoded.userId, payload.userId);
      assert.strictEqual(decoded.role, payload.role);
    });

    it('should not verify an invalid JWT token', () => {
      const payload = { userId: '12345', role: 'User' };
      const token = jwt.sign(payload, 'wrongSecret');
      assert.throws(() => jwt.verify(token, process.env.JWT_SECRET), jwt.JsonWebTokenError);
    });
  });

  describe('Authorization', () => {
    it('should authorize users with correct role', async () => {
      const user = new User({ name: 'Test User', email: 'test@example.com', password: 'password', role: 'Admin' });
      await user.save();
      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);
      const authorizedUser = await AuthService.authorize(token);
      assert.strictEqual(authorizedUser.role, 'Admin');
    });

    it('should not authorize users with incorrect role', async () => {
      const user = new User({ name: 'Test User', email: 'test@example.com', password: 'password', role: 'User' });
      await user.save();
      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);
      assert.rejects(() => AuthService.checkPermissions(user, 'Admin'), { message: 'Insufficient permissions' });
    });
  });
});
