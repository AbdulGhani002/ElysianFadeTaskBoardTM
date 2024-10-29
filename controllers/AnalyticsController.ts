import { Context } from 'https://deno.land/x/oak/mod.ts';
import AnalyticsService from '../services/AnalyticsService.ts';

class AnalyticsController {
  private static handleError(context: Context, error: Error) {
    console.error("Error:", error); // Log the error
    context.response.status = 500;
    context.render('ErrorPage.ejs', { error: error.message });
  }

  static async generateDailyReport(context: Context) {
    try {
      const report = await AnalyticsService.generateDailyReport();
      context.response.status = 200;
      context.render('SuccessPage.ejs', { report });
    } catch (error) {
      this.handleError(context, error);
    }
  }

  static async generateWeeklySummary(context: Context) {
    try {
      const summary = await AnalyticsService.generateWeeklySummary();
      context.response.status = 200;
      context.render('SuccessPage.ejs', { summary });
    } catch (error) {
      this.handleError(context, error);
    }
  }

  static async generateTeamPerformanceReport(context: Context) {
    try {
      const report = await AnalyticsService.generateTeamPerformanceReport();
      context.response.status = 200;
      context.render('SuccessPage.ejs', { report });
    } catch (error) {
      this.handleError(context, error);
    }
  }
}

export default AnalyticsController;
