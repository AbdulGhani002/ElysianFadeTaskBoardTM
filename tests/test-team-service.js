const TeamService = require('../services/TeamService');
const Team = require('../models/Team');
const User = require('../models/User');
const mongoose = require('mongoose');

describe('TeamService', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('createTeam', () => {
    it('should create a new team', async () => {
      const teamData = {
        teamName: 'Test Team',
        members: [],
        permissions: ['read', 'write']
      };
      const team = await TeamService.createTeam(teamData);
      expect(team).toHaveProperty('_id');
      expect(team.teamName).toBe('Test Team');
      expect(team.permissions).toContain('read');
      expect(team.permissions).toContain('write');
    });
  });

  describe('addMember', () => {
    it('should add a member to the team', async () => {
      const team = new Team({
        teamName: 'Test Team',
        members: [],
        permissions: ['read', 'write']
      });
      await team.save();

      const user = new User({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password',
        role: 'User'
      });
      await user.save();

      const updatedTeam = await TeamService.addMember(team._id, user._id);
      expect(updatedTeam.members).toContainEqual(user._id);
    });
  });

  describe('removeMember', () => {
    it('should remove a member from the team', async () => {
      const user = new User({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password',
        role: 'User'
      });
      await user.save();

      const team = new Team({
        teamName: 'Test Team',
        members: [user._id],
        permissions: ['read', 'write']
      });
      await team.save();

      const updatedTeam = await TeamService.removeMember(team._id, user._id);
      expect(updatedTeam.members).not.toContainEqual(user._id);
    });
  });

  describe('assignRole', () => {
    it('should assign a role to a user', async () => {
      const user = new User({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password',
        role: 'User'
      });
      await user.save();

      const team = new Team({
        teamName: 'Test Team',
        members: [user._id],
        permissions: ['read', 'write']
      });
      await team.save();

      const updatedUser = await TeamService.assignRole(team._id, user._id, 'Admin');
      expect(updatedUser.role).toBe('Admin');
    });
  });
});
