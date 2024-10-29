import { Context } from 'https://deno.land/x/oak/mod.ts';
import NotificationService from '../services/NotificationService.ts';

class NotificationController {
  async sendTaskReminder(context: Context) {
    try {
      const { taskId, userId } = await context.request.body().value;
      await NotificationService.sendTaskReminder(taskId, userId);
      context.response.status = 200;
      context.render('SuccessPage.ejs', { message: 'Task reminder sent successfully' });
    } catch (error) {
      console.error('Error in sendTaskReminder:', error);
      context.response.status = 500;
      context.render('ErrorPage.ejs', { error: error.message });
    }
  }

  async sendDeadlineNotification(context: Context) {
    try {
      const { taskId, userId } = await context.request.body().value;
      await NotificationService.sendDeadlineNotification(taskId, userId);
      context.response.status = 200;
      context.render('SuccessPage.ejs', { message: 'Deadline notification sent successfully' });
    } catch (error) {
      console.error('Error in sendDeadlineNotification:', error);
      context.response.status = 500;
      context.render('ErrorPage.ejs', { error: error.message });
    }
  }

  async notifyTeam(context: Context) {
    try {
      const { teamId, message } = await context.request.body().value;
      await NotificationService.notifyTeam(teamId, message);
      context.response.status = 200;
      context.render('SuccessPage.ejs', { message: 'Team notified successfully' });
    } catch (error) {
      console.error('Error in notifyTeam:', error);
      context.response.status = 500;
      context.render('ErrorPage.ejs', { error: error.message });
    }
  }
}

export default new NotificationController();
