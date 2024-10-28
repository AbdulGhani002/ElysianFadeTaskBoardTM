import { ObjectId } from 'https://deno.land/x/mongo@v0.29.0/mod.ts';
import { connectToDatabase } from '../utils/database.ts';

class NotificationService {
  static async sendTaskReminder(taskId: ObjectId, userId: ObjectId) {
    const db = await connectToDatabase();
    const tasksCollection = db.collection('tasks');
    const usersCollection = db.collection('users');
    const task = await tasksCollection.findOne({ _id: taskId });
    const user = await usersCollection.findOne({ _id: userId });

    if (!task || !user) {
      throw new Error('Task or User not found');
    }

    // Logic to send task reminder notification
    console.log(`Reminder: Task "${task.title}" is due soon for user ${user.name}`);
  }

  static async sendDeadlineNotification(taskId: ObjectId, userId: ObjectId) {
    const db = await connectToDatabase();
    const tasksCollection = db.collection('tasks');
    const usersCollection = db.collection('users');
    const task = await tasksCollection.findOne({ _id: taskId });
    const user = await usersCollection.findOne({ _id: userId });

    if (!task || !user) {
      throw new Error('Task or User not found');
    }

    // Logic to send deadline notification
    console.log(`Deadline: Task "${task.title}" is due now for user ${user.name}`);
  }

  static async notifyTeam(teamId: ObjectId, message: string) {
    const db = await connectToDatabase();
    const teamsCollection = db.collection('teams');
    const team = await teamsCollection.findOne({ _id: teamId });

    if (!team) {
      throw new Error('Team not found');
    }

    // Logic to notify team
    console.log(`Notification to team "${team.teamName}": ${message}`);
  }
}

export default NotificationService;
