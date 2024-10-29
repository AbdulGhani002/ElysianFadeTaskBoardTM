import { Context } from 'https://deno.land/x/oak/mod.ts';
import Team from '../models/Team.ts';
import User from '../models/User.ts';
import * as dejs from "https://deno.land/x/dejs@0.10.3/mod.ts";
class TeamController {
  async createTeam(context: Context) {
    try {
      const { teamName, members, permissions } = await context.request.body().value;
      const team = new Team({ teamName, members, permissions });
      await team.save();
      context.response.status = 201;
      context.render('SuccessPage.ejs', { team });
    } catch (error) {
      console.error('Error in createTeam:', error);
      context.response.status = 500;
      context.render('ErrorPage.ejs', { error: error.message });
    }
  }

  async addMember(context: Context) {
    try {
      const { teamId, userId } = await context.request.body().value;
      const team = await Team.findById(teamId);
      if (!team) {
        context.response.status = 404;
        context.render('ErrorPage.ejs', { error: 'Team not found' });
        return;
      }
      const user = await User.findById(userId);
      if (!user) {
        context.response.status = 404;
        context.render('ErrorPage.ejs', { error: 'User not found' });
        return;
      }
      team.members.push(user);
      await team.save();
      context.response.status = 200;
      context.render('SuccessPage.ejs', { team });
    } catch (error) {
      console.error('Error in addMember:', error);
      context.response.status = 500;
      context.render('ErrorPage.ejs', { error: error.message });
    }
  }

  async removeMember(context: Context) {
    try {
      const { teamId, userId } = await context.request.body().value;
      const team = await Team.findById(teamId);
      if (!team) {
        context.response.status = 404;
        context.render('ErrorPage.ejs', { error: 'Team not found' });
        return;
      }
      team.members = team.members.filter(member => member.toString() !== userId);
      await team.save();
      context.response.status = 200;
      context.render('SuccessPage.ejs', { team });
    } catch (error) {
      console.error('Error in removeMember:', error);
      context.response.status = 500;
      context.render('ErrorPage.ejs', { error: error.message });
    }
  }

  async assignRole(context: Context) {
    try {
      const { teamId, userId, role } = await context.request.body().value;
      const team = await Team.findById(teamId);
      if (!team) {
        context.response.status = 404;
        context.render('ErrorPage.ejs', { error: 'Team not found' });
        return;
      }
      const user = await User.findById(userId);
      if (!user) {
        context.response.status = 404;
        context.render('ErrorPage.ejs', { error: 'User not found' });
        return;
      }
      user.role = role;
      await user.save();
      context.response.status = 200;
      context.render('SuccessPage.ejs', { user });
    } catch (error) {
      console.error('Error in assignRole:', error);
      context.response.status = 500;
      context.render('ErrorPage.ejs', { error: error.message });
    }
  }
}

export default new TeamController();
