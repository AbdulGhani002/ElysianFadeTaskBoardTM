const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.put('/profile/:userId', UserController.updateProfile);

module.exports = router;
