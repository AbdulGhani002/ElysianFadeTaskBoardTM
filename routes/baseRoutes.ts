import * as dejs from "https://deno.land/x/dejs@0.10.3/mod.ts";
import { Router } from 'https://deno.land/x/oak/mod.ts';
import { join } from 'https://deno.land/std/path/mod.ts';

const router = new Router();

// Middleware to add a render method to the context
router.use(async (context, next) => {
  context.render = async (view: string, data: Record<string, unknown>) => {
    const filePath = join(Deno.cwd(), 'views', view);
    const renderedContent = await dejs.render(filePath, data);
    context.response.body = renderedContent;
  };
  await next();
});

// Define your routes
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
