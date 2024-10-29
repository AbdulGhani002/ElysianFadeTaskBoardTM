import { Context } from 'https://deno.land/x/oak/mod.ts';
import GoalService from '../services/GoalService.ts';
import * as dejs from "https://deno.land/x/dejs@0.10.3/mod.ts";
class GoalController {
  static async createGoal(context: Context) {
    try {
      const body = await context.request.body().value;
      const goal = await GoalService.createGoal(body);
      context.response.status = 201;
      if (context.response.writable) {
        context.render('SuccessPage.ejs', { goal });
      }
    } catch (error) {
      console.error('Error in createGoal:', error);
      context.response.status = 500;
      if (context.response.writable) {
        context.render('ErrorPage.ejs', { error: error.message });
      }
    }
  }

  static async getGoals(context: Context) {
    try {
      const goals = await GoalService.getGoals();
      context.response.status = 200;
      if (context.response.writable) {
        context.render('SuccessPage.ejs', { goals });
      }
    } catch (error) {
      console.error('Error in getGoals:', error);
      context.response.status = 500;
      if (context.response.writable) {
        context.render('ErrorPage.ejs', { error: error.message });
      }
    }
  }

  static async getGoalById(context: Context) {
    try {
      const { id } = context.params;
      const goal = await GoalService.getGoalById(id);
      if (!goal) {
        context.response.status = 404;
        if (context.response.writable) {
          context.render('ErrorPage.ejs', { error: 'Goal not found' });
        }
        return;
      }
      context.response.status = 200;
      if (context.response.writable) {
        context.render('SuccessPage.ejs', { goal });
      }
    } catch (error) {
      console.error('Error in getGoalById:', error);
      context.response.status = 500;
      if (context.response.writable) {
        context.render('ErrorPage.ejs', { error: error.message });
      }
    }
  }

  static async updateGoal(context: Context) {
    try {
      const { id } = context.params;
      const body = await context.request.body().value;
      const goal = await GoalService.updateGoal(id, body);
      if (!goal) {
        context.response.status = 404;
        if (context.response.writable) {
          context.render('ErrorPage.ejs', { error: 'Goal not found' });
        }
        return;
      }
      context.response.status = 200;
      if (context.response.writable) {
        context.render('SuccessPage.ejs', { goal });
      }
    } catch (error) {
      console.error('Error in updateGoal:', error);
      context.response.status = 500;
      if (context.response.writable) {
        context.render('ErrorPage.ejs', { error: error.message });
      }
    }
  }

  static async deleteGoal(context: Context) {
    try {
      const { id } = context.params;
      const goal = await GoalService.deleteGoal(id);
      if (!goal) {
        context.response.status = 404;
        if (context.response.writable) {
          context.render('ErrorPage.ejs', { error: 'Goal not found' });
        }
        return;
      }
      context.response.status = 200;
      if (context.response.writable) {
        context.render('SuccessPage.ejs', { message: 'Goal deleted successfully' });
      }
    } catch (error) {
      console.error('Error in deleteGoal:', error);
      context.response.status = 500;
      if (context.response.writable) {
        context.render('ErrorPage.ejs', { error: error.message });
      }
    }
  }
}

export default GoalController;
