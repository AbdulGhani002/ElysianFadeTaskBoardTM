const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

class AuthService {
  static async authenticate(email, password) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }
      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);
      return token;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async authorize(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error('Unauthorized');
    }
  }

  static async checkPermissions(user, requiredRole) {
    if (user.role !== requiredRole) {
      throw new Error('Insufficient permissions');
    }
    return true;
  }

  static async storeSessionData(req, user) {
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };
  }

  static async getSessionData(req) {
    return req.session.user;
  }

  static async clearSessionData(req) {
    req.session.destroy();
  }
}

module.exports = AuthService;
