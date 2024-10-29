const express = require('express');
const NotificationController = require('../controllers/NotificationController');

const router = express.Router();

router.post('/taskReminder', NotificationController.sendTaskReminder);
router.post('/deadlineNotification', NotificationController.sendDeadlineNotification);
router.post('/notifyTeam', NotificationController.notifyTeam);

module.exports = router;
