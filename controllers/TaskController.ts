import { Context } from 'https://deno.land/x/oak/mod.ts';
import TaskService from '../services/TaskService.ts';

class TaskController {
  static async createTask(context: Context) {
    try {
      const body = await context.request.body().value;
      const task = await TaskService.createTask(body);
      context.response.status = 201;
      context.response.body = task;
    } catch (error) {
      context.response.status = 500;
      context.response.body = { error: error.message };
    }
  }

  static async getTasks(context: Context) {
    try {
      const tasks = await TaskService.getTasks();
      context.response.status = 200;
      context.response.body = tasks;
    } catch (error) {
      context.response.status = 500;
      context.response.body = { error: error.message };
    }
  }

  static async getTaskById(context: Context) {
    try {
      const { id } = context.params;
      const task = await TaskService.getTaskById(id);
      if (!task) {
        context.response.status = 404;
        context.response.body = { error: 'Task not found' };
        return;
      }
      context.response.status = 200;
      context.response.body = task;
    } catch (error) {
      context.response.status = 500;
      context.response.body = { error: error.message };
    }
  }

  static async updateTask(context: Context) {
    try {
      const { id } = context.params;
      const body = await context.request.body().value;
      const task = await TaskService.updateTask(id, body);
      if (!task) {
        context.response.status = 404;
        context.response.body = { error: 'Task not found' };
        return;
      }
      context.response.status = 200;
      context.response.body = task;
    } catch (error) {
      context.response.status = 500;
      context.response.body = { error: error.message };
    }
  }

  static async deleteTask(context: Context) {
    try {
      const { id } = context.params;
      const task = await TaskService.deleteTask(id);
      if (!task) {
        context.response.status = 404;
        context.response.body = { error: 'Task not found' };
        return;
      }
      context.response.status = 200;
      context.response.body = { message: 'Task deleted successfully' };
    } catch (error) {
      context.response.status = 500;
      context.response.body = { error: error.message };
    }
  }
}

export default TaskController;
