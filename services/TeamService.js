const Team = require('../models/Team.js');
const User = require('../models/User.js');

class TeamService {
  static async createTeam(teamData) {
    const team = new Team(teamData.teamName, teamData.members, teamData.permissions);
    await team.save();
    return team;
  }

  static async addMember(teamId, userId) {
    const team = await Team.findById(teamId);
    if (!team) {
      throw new Error('Team not found');
    }
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    team.members.push(user);
    await team.save();
    return team;
  }

  static async removeMember(teamId, userId) {
    const team = await Team.findById(teamId);
    if (!team) {
      throw new Error('Team not found');
    }
    team.members = team.members.filter(member => member.toString() !== userId);
    await team.save();
    return team;
  }

  static async assignRole(teamId, userId, role) {
    const team = await Team.findById(teamId);
    if (!team) {
      throw new Error('Team not found');
    }
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.role = role;
    await user.save();
    return user;
  }
}

module.exports = TeamService;
