const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

class UserController {
  static handleError(res, error) {
    console.error("Error:", error);
    res.status(500).render('ErrorPage', { error: error.message });
  }

  static async register(req, res) {
    try {
      const { name, email, password, role } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword, role });
      await user.save();
      res.status(201).render('SuccessPage', { message: 'User registered successfully' });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).render('ErrorPage', { error: 'User not found' });
        return;
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).render('ErrorPage', { error: 'Invalid credentials' });
        return;
      }
      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);
      res.status(200).render('SuccessPage', { token });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  static async updateProfile(req, res) {
    try {
      const { userId } = req.params;
      const updates = req.body;
      const user = await User.findByIdAndUpdate(userId, updates, { new: true });
      if (!user) {
        res.status(404).render('ErrorPage', { error: 'User not found' });
        return;
      }
      res.status(200).render('SuccessPage', { user });
    } catch (error) {
      this.handleError(res, error);
    }
  }
}

module.exports = UserController;
