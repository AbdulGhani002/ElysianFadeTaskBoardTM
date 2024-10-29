import { Context } from 'https://deno.land/x/oak/mod.ts';
import NotificationService from '../services/NotificationService.ts';
import * as dejs from "https://deno.land/x/dejs@0.10.3/mod.ts";

class NotificationController {
  private static handleError(context: Context, error: Error) {
    console.error("Error:", error); // Log the error
    context.response.status = 500;

    // Ensure response is writable before rendering
    if (context.response.writable) {
      context.render('ErrorPage.ejs', { error: error.message });
    }
  }

  async sendTaskReminder(context: Context) {
    try {
      const { taskId, userId } = await context.request.body().value;
      await NotificationService.sendTaskReminder(taskId, userId);
      context.response.status = 200;
      if (context.response.writable) {
        context.render('SuccessPage.ejs', { message: 'Task reminder sent successfully' });
      }
    } catch (error) {
      NotificationController.handleError(context, error);
    }
  }

  async sendDeadlineNotification(context: Context) {
    try {
      const { taskId, userId } = await context.request.body().value;
      await NotificationService.sendDeadlineNotification(taskId, userId);
      context.response.status = 200;
      if (context.response.writable) {
        context.render('SuccessPage.ejs', { message: 'Deadline notification sent successfully' });
      }
    } catch (error) {
      NotificationController.handleError(context, error);
    }
  }

  async notifyTeam(context: Context) {
    try {
      const { teamId, message } = await context.request.body().value;
      await NotificationService.notifyTeam(teamId, message);
      context.response.status = 200;
      if (context.response.writable) {
        context.render('SuccessPage.ejs', { message: 'Team notified successfully' });
      }
    } catch (error) {
      NotificationController.handleError(context, error);
    }
  }
}

export default new NotificationController();
