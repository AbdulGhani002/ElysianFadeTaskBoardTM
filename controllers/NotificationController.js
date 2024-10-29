const NotificationService = require('../services/NotificationService');

class NotificationController {
  static async sendTaskReminder(req, res) {
    try {
      const { taskId, userId } = req.body;
      await NotificationService.sendTaskReminder(taskId, userId);
      res.status(200).render('SuccessPage', { message: 'Task reminder sent successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).render('ErrorPage', { error: error.message });
    }
  }

  static async sendDeadlineNotification(req, res) {
    try {
      const { taskId, userId } = req.body;
      await NotificationService.sendDeadlineNotification(taskId, userId);
      res.status(200).render('SuccessPage', { message: 'Deadline notification sent successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).render('ErrorPage', { error: error.message });
    }
  }

  static async notifyTeam(req, res) {
    try {
      const { teamId, message } = req.body;
      await NotificationService.notifyTeam(teamId, message);
      res.status(200).render('SuccessPage', { message: 'Team notified successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).render('ErrorPage', { error: error.message });
    }
  }
}

module.exports = NotificationController;
