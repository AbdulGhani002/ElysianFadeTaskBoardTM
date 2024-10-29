const { ObjectId } = require('mongoose').Types;
const { connectToDatabase } = require('../utils/database');

class NotificationService {
  static async sendTaskReminder(taskId, userId) {
    const db = await connectToDatabase();
    const tasksCollection = db.collection('tasks');
    const usersCollection = db.collection('users');
    const task = await tasksCollection.findOne({ _id: ObjectId(taskId) });
    const user = await usersCollection.findOne({ _id: ObjectId(userId) });

    if (!task || !user) {
      throw new Error('Task or User not found');
    }

    // Logic to send task reminder notification
    console.log(`Reminder: Task "${task.title}" is due soon for user ${user.name}`);
  }

  static async sendDeadlineNotification(taskId, userId) {
    const db = await connectToDatabase();
    const tasksCollection = db.collection('tasks');
    const usersCollection = db.collection('users');
    const task = await tasksCollection.findOne({ _id: ObjectId(taskId) });
    const user = await usersCollection.findOne({ _id: ObjectId(userId) });

    if (!task || !user) {
      throw new Error('Task or User not found');
    }

    // Logic to send deadline notification
    console.log(`Deadline: Task "${task.title}" is due now for user ${user.name}`);
  }

  static async notifyTeam(teamId, message) {
    const db = await connectToDatabase();
    const teamsCollection = db.collection('teams');
    const team = await teamsCollection.findOne({ _id: ObjectId(teamId) });

    if (!team) {
      throw new Error('Team not found');
    }

    // Logic to notify team
    console.log(`Notification to team "${team.teamName}": ${message}`);
  }
}

module.exports = NotificationService;
