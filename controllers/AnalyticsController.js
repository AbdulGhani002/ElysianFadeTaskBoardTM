const AnalyticsService = require('../services/AnalyticsService');

class AnalyticsController {
  static async generateDailyReport(req, res) {
    try {
      const report = await AnalyticsService.generateDailyReport();
      res.status(200).render('SuccessPage', { report });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).render('ErrorPage', { error: error.message });
    }
  }

  static async generateWeeklySummary(req, res) {
    try {
      const summary = await AnalyticsService.generateWeeklySummary();
      res.status(200).render('SuccessPage', { summary });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).render('ErrorPage', { error: error.message });
    }
  }

  static async generateTeamPerformanceReport(req, res) {
    try {
      const report = await AnalyticsService.generateTeamPerformanceReport();
      res.status(200).render('SuccessPage', { report });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).render('ErrorPage', { error: error.message });
    }
  }
}

module.exports = AnalyticsController;
