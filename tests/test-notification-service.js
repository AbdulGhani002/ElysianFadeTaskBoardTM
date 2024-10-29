const NotificationService = require('../services/NotificationService');
const { connectToDatabase } = require('../utils/database');
const { ObjectId } = require('mongoose').Types;

describe('NotificationService', () => {
  let db;
  let tasksCollection;
  let usersCollection;
  let teamsCollection;

  beforeAll(async () => {
    db = await connectToDatabase();
    tasksCollection = db.collection('tasks');
    usersCollection = db.collection('users');
    teamsCollection = db.collection('teams');
  });

  afterAll(async () => {
    await db.close();
  });

  describe('sendTaskReminder', () => {
    it('should send a task reminder notification', async () => {
      const taskId = new ObjectId();
      const userId = new ObjectId();

      await tasksCollection.insertOne({ _id: taskId, title: 'Test Task' });
      await usersCollection.insertOne({ _id: userId, name: 'Test User' });

      const consoleSpy = jest.spyOn(console, 'log');
      await NotificationService.sendTaskReminder(taskId, userId);

      expect(consoleSpy).toHaveBeenCalledWith(`Reminder: Task "Test Task" is due soon for user Test User`);
      consoleSpy.mockRestore();
    });

    it('should throw an error if task or user is not found', async () => {
      const taskId = new ObjectId();
      const userId = new ObjectId();

      await expect(NotificationService.sendTaskReminder(taskId, userId)).rejects.toThrow('Task or User not found');
    });
  });

  describe('sendDeadlineNotification', () => {
    it('should send a deadline notification', async () => {
      const taskId = new ObjectId();
      const userId = new ObjectId();

      await tasksCollection.insertOne({ _id: taskId, title: 'Test Task' });
      await usersCollection.insertOne({ _id: userId, name: 'Test User' });

      const consoleSpy = jest.spyOn(console, 'log');
      await NotificationService.sendDeadlineNotification(taskId, userId);

      expect(consoleSpy).toHaveBeenCalledWith(`Deadline: Task "Test Task" is due now for user Test User`);
      consoleSpy.mockRestore();
    });

    it('should throw an error if task or user is not found', async () => {
      const taskId = new ObjectId();
      const userId = new ObjectId();

      await expect(NotificationService.sendDeadlineNotification(taskId, userId)).rejects.toThrow('Task or User not found');
    });
  });

  describe('notifyTeam', () => {
    it('should notify the team', async () => {
      const teamId = new ObjectId();
      const message = 'Test Message';

      await teamsCollection.insertOne({ _id: teamId, teamName: 'Test Team' });

      const consoleSpy = jest.spyOn(console, 'log');
      await NotificationService.notifyTeam(teamId, message);

      expect(consoleSpy).toHaveBeenCalledWith(`Notification to team "Test Team": ${message}`);
      consoleSpy.mockRestore();
    });

    it('should throw an error if team is not found', async () => {
      const teamId = new ObjectId();
      const message = 'Test Message';

      await expect(NotificationService.notifyTeam(teamId, message)).rejects.toThrow('Team not found');
    });
  });
});
