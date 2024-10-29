const Task = require('../models/Task');

class TaskService {
  static async createTask(taskData) {
    const task = new Task(taskData);
    await task.save();
    return task;
  }

  static async getTasks() {
    const tasks = await Task.find();
    return tasks;
  }

  static async getTaskById(taskId) {
    const task = await Task.findById(taskId);
    return task;
  }

  static async updateTask(taskId, taskData) {
    const task = await Task.findByIdAndUpdate(taskId, taskData, { new: true });
    return task;
  }

  static async deleteTask(taskId) {
    const task = await Task.findByIdAndDelete(taskId);
    return task;
  }
}

module.exports = TaskService;
