import { Router } from 'https://deno.land/x/oak/mod.ts';

const router = new Router();

router.get('/error', (context) => {
  context.render('ErrorPage.ejs', { error: 'An error occurred' });
});

router.get('/success', (context) => {
  context.render('SuccessPage.ejs', { message: 'Operation successful' });
});

router.get('/', (context) => {
  context.render('HomePage.ejs');
});

router.get('/goals', (context) => {
  context.render('GoalPage.ejs');
});

router.get('/settings', (context) => {
  context.render('SettingsPage.ejs');
});

router.get('/analytics', (context) => {
  context.render('AnalyticsPage.ejs');
});

export default router;
