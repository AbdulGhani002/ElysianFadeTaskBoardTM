import { Context } from 'https://deno.land/x/oak/mod.ts';
import NotificationService from '../services/NotificationService.ts';

class NotificationController {
  async sendTaskReminder(context: Context) {
    try {
      const { taskId, userId } = await context.request.body().value;
      await NotificationService.sendTaskReminder(taskId, userId);
      context.response.status = 200;
      context.response.body = { message: 'Task reminder sent successfully' };
    } catch (error) {
      context.response.status = 500;
      context.response.body = { error: error.message };
    }
  }

  async sendDeadlineNotification(context: Context) {
    try {
      const { taskId, userId } = await context.request.body().value;
      await NotificationService.sendDeadlineNotification(taskId, userId);
      context.response.status = 200;
      context.response.body = { message: 'Deadline notification sent successfully' };
    } catch (error) {
      context.response.status = 500;
      context.response.body = { error: error.message };
    }
  }

  async notifyTeam(context: Context) {
    try {
      const { teamId, message } = await context.request.body().value;
      await NotificationService.notifyTeam(teamId, message);
      context.response.status = 200;
      context.response.body = { message: 'Team notified successfully' };
    } catch (error) {
      context.response.status = 500;
      context.response.body = { error: error.message };
    }
  }
}

export default new NotificationController();
