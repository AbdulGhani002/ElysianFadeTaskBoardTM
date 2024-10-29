import { Context } from 'https://deno.land/x/oak/mod.ts';
import GoalService from '../services/GoalService.ts';
import * as dejs from "https://deno.land/x/dejs@0.10.3/mod.ts";

class GoalController {
  private static handleError(context: Context, error: Error) {
    console.error("Error:", error); // Log the error
    context.response.status = 500;

    // Ensure response is writable before rendering
    if (context.response.writable) {
      context.render('ErrorPage.ejs', { error: error.message });
    }
  }

  static async createGoal(context: Context) {
    try {
      const body = await context.request.body().value;
      const goal = await GoalService.createGoal(body);
      context.response.status = 201;
      if (context.response.writable) {
        context.render('SuccessPage.ejs', { goal });
      }
    } catch (error) {
      this.handleError(context, error);
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
      this.handleError(context, error);
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
      this.handleError(context, error);
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
      this.handleError(context, error);
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
      this.handleError(context, error);
    }
  }
}

export default GoalController;
