import { Context } from 'https://deno.land/x/oak/mod.ts';
import Team from '../models/Team.ts';
import User from '../models/User.ts';
import * as dejs from "https://deno.land/x/dejs@0.10.3/mod.ts";

class TeamController {
  private static handleError(context: Context, error: Error) {
    console.error("Error:", error); // Log the error
    context.response.status = 500;

    // Ensure response is writable before rendering
    if (context.response.writable) {
      context.render('ErrorPage.ejs', { error: error.message });
    }
  }

  async createTeam(context: Context) {
    try {
      const { teamName, members, permissions } = await context.request.body().value;
      const team = new Team({ teamName, members, permissions });
      await team.save();
      context.response.status = 201;
      if (context.response.writable) {
        context.render('SuccessPage.ejs', { team });
      }
    } catch (error) {
      TeamController.handleError(context, error);
    }
  }

  async addMember(context: Context) {
    try {
      const { teamId, userId } = await context.request.body().value;
      const team = await Team.findById(teamId);
      if (!team) {
        context.response.status = 404;
        if (context.response.writable) {
          context.render('ErrorPage.ejs', { error: 'Team not found' });
        }
        return;
      }
      const user = await User.findById(userId);
      if (!user) {
        context.response.status = 404;
        if (context.response.writable) {
          context.render('ErrorPage.ejs', { error: 'User not found' });
        }
        return;
      }
      team.members.push(user);
      await team.save();
      context.response.status = 200;
      if (context.response.writable) {
        context.render('SuccessPage.ejs', { team });
      }
    } catch (error) {
      TeamController.handleError(context, error);
    }
  }

  async removeMember(context: Context) {
    try {
      const { teamId, userId } = await context.request.body().value;
      const team = await Team.findById(teamId);
      if (!team) {
        context.response.status = 404;
        if (context.response.writable) {
          context.render('ErrorPage.ejs', { error: 'Team not found' });
        }
        return;
      }
      team.members = team.members.filter(member => member.toString() !== userId);
      await team.save();
      context.response.status = 200;
      if (context.response.writable) {
        context.render('SuccessPage.ejs', { team });
      }
    } catch (error) {
      TeamController.handleError(context, error);
    }
  }

  async assignRole(context: Context) {
    try {
      const { teamId, userId, role } = await context.request.body().value;
      const team = await Team.findById(teamId);
      if (!team) {
        context.response.status = 404;
        if (context.response.writable) {
          context.render('ErrorPage.ejs', { error: 'Team not found' });
        }
        return;
      }
      const user = await User.findById(userId);
      if (!user) {
        context.response.status = 404;
        if (context.response.writable) {
          context.render('ErrorPage.ejs', { error: 'User not found' });
        }
        return;
      }
      user.role = role;
      await user.save();
      context.response.status = 200;
      if (context.response.writable) {
        context.render('SuccessPage.ejs', { user });
      }
    } catch (error) {
      TeamController.handleError(context, error);
    }
  }
}

export default new TeamController();
