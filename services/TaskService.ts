import { ObjectId } from 'https://deno.land/x/mongo@v0.29.0/mod.ts';
import { Task, ITask } from '../models/Task.ts';

class TaskService {
  static async createTask(taskData: ITask) {
    const task = await Task.createTask(taskData);
    return task;
  }

  static async getTasks() {
    const tasks = await Task.find({});
    return tasks;
  }

  static async getTaskById(taskId: ObjectId) {
    const task = await Task.findById(taskId);
    return task;
  }

  static async updateTask(taskId: ObjectId, taskData: Partial<ITask>) {
    const task = await Task.updateTask(taskId, taskData);
    return task;
  }

  static async deleteTask(taskId: ObjectId) {
    const task = await Task.deleteTask(taskId);
    return task;
  }
}

export default TaskService;
