import { Context } from 'https://deno.land/x/oak/mod.ts';
import TaskService from '../services/TaskService.ts';
import * as dejs from "https://deno.land/x/dejs@0.10.3/mod.ts";

class TaskController {
  private static handleError(context: Context, error: Error) {
    console.error("Error:", error); // Log the error
    context.response.status = 500;

    // Ensure response is writable before rendering
    if (context.response.writable) {
      context.render('ErrorPage.ejs', { error: error.message });
    }
  }

  static async createTask(context: Context) {
    try {
      const body = await context.request.body().value;
      const task = await TaskService.createTask(body);
      context.response.status = 201;
      if (context.response.writable) {
        context.render('SuccessPage.ejs', { task });
      }
    } catch (error) {
      this.handleError(context, error);
    }
  }

  static async getTasks(context: Context) {
    try {
      const tasks = await TaskService.getTasks();
      context.response.status = 200;
      if (context.response.writable) {
        context.render('SuccessPage.ejs', { tasks });
      }
    } catch (error) {
      this.handleError(context, error);
    }
  }

  static async getTaskById(context: Context) {
    try {
      const { id } = context.params;
      const task = await TaskService.getTaskById(id);
      if (!task) {
        context.response.status = 404;
        if (context.response.writable) {
          context.render('ErrorPage.ejs', { error: 'Task not found' });
        }
        return;
      }
      context.response.status = 200;
      if (context.response.writable) {
        context.render('SuccessPage.ejs', { task });
      }
    } catch (error) {
      this.handleError(context, error);
    }
  }

  static async updateTask(context: Context) {
    try {
      const { id } = context.params;
      const body = await context.request.body().value;
      const task = await TaskService.updateTask(id, body);
      if (!task) {
        context.response.status = 404;
        if (context.response.writable) {
          context.render('ErrorPage.ejs', { error: 'Task not found' });
        }
        return;
      }
      context.response.status = 200;
      if (context.response.writable) {
        context.render('SuccessPage.ejs', { task });
      }
    } catch (error) {
      this.handleError(context, error);
    }
  }

  static async deleteTask(context: Context) {
    try {
      const { id } = context.params;
      const task = await TaskService.deleteTask(id);
      if (!task) {
        context.response.status = 404;
        if (context.response.writable) {
          context.render('ErrorPage.ejs', { error: 'Task not found' });
        }
        return;
      }
      context.response.status = 200;
      if (context.response.writable) {
        context.render('SuccessPage.ejs', { message: 'Task deleted successfully' });
      }
    } catch (error) {
      this.handleError(context, error);
    }
  }
}

export default TaskController;
