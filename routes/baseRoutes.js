const express = require('express');
const router = express.Router();

router.get('/error', (req, res) => {
  res.render('ErrorPage', { error: 'An error occurred' });
});

router.get('/success', (req, res) => {
  res.render('SuccessPage', { message: 'Operation successful' });
});

router.get('/', (req, res) => {
  res.render('HomePage');
});

router.get('/goals', (req, res) => {
  res.render('GoalPage');
});

router.get('/settings', (req, res) => {
  res.render('SettingsPage');
});

router.get('/analytics', (req, res) => {
  res.render('AnalyticsPage');
});

module.exports = router;
