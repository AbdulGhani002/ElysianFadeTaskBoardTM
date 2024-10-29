const Team = require('../models/Team');
const User = require('../models/User');

class TeamController {
  static async createTeam(req, res) {
    try {
      const { teamName, members, permissions } = req.body;
      const team = new Team({ teamName, members, permissions });
      await team.save();
      res.status(201).json(team);
    } catch (error) {
      console.error('Error creating team:', error);
      res.status(500).json({ error: 'Failed to create team' });
    }
  }

  static async addMember(req, res) {
    try {
      const { teamId, userId } = req.body;
      const team = await Team.findById(teamId);
      if (!team) {
        return res.status(404).json({ error: 'Team not found' });
      }
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      team.members.push(user);
      await team.save();
      res.status(200).json(team);
    } catch (error) {
      console.error('Error adding member:', error);
      res.status(500).json({ error: 'Failed to add member' });
    }
  }

  static async removeMember(req, res) {
    try {
      const { teamId, userId } = req.body;
      const team = await Team.findById(teamId);
      if (!team) {
        return res.status(404).json({ error: 'Team not found' });
      }
      team.members = team.members.filter(member => member.toString() !== userId);
      await team.save();
      res.status(200).json(team);
    } catch (error) {
      console.error('Error removing member:', error);
      res.status(500).json({ error: 'Failed to remove member' });
    }
  }

  static async assignRole(req, res) {
    try {
      const { teamId, userId, role } = req.body;
      const team = await Team.findById(teamId);
      if (!team) {
        return res.status(404).json({ error: 'Team not found' });
      }
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      user.role = role;
      await user.save();
      res.status(200).json(user);
    } catch (error) {
      console.error('Error assigning role:', error);
      res.status(500).json({ error: 'Failed to assign role' });
    }
  }
}

module.exports = TeamController;
