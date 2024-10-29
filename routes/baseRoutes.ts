import { Router, RouterContext } from 'https://deno.land/x/oak/mod.ts';
import { join } from 'https://deno.land/std/path/mod.ts';
import * as dejs from 'https://deno.land/x/dejs@0.10.3/mod.ts';

// Extend RouterContext to include the render method
interface CustomContext extends RouterContext<string, Record<string | number, string | undefined>, Record<string, any>> {
  render: (view: string, data?: Record<string, unknown>) => Promise<void>;
}

const router = new Router();

// Middleware to add a render method to the context
router.use(async (context: CustomContext, next) => {
  context.render = async (view: string, data: Record<string, unknown> = {}) => {
    const filePath = join(Deno.cwd(), 'views', view);
    const renderedContent = await dejs.render(filePath, data);
    if (context.response.writable) {
      context.response.body = renderedContent;
    }
  };
  await next(); // Call the next middleware or route handler
});

// Define your routes
router.get('/error', (context: CustomContext) => {
  context.render('ErrorPage.ejs', { error: 'An error occurred' });
});

router.get('/success', (context: CustomContext) => {
  context.render('SuccessPage.ejs', { message: 'Operation successful' });
});

router.get('/', (context: CustomContext) => {
  context.render('HomePage.ejs');
});

router.get('/goals', (context: CustomContext) => {
  context.render('GoalPage.ejs');
});

router.get('/settings', (context: CustomContext) => {
  context.render('SettingsPage.ejs');
});

router.get('/analytics', (context: CustomContext) => {
  context.render('AnalyticsPage.ejs');
});

export default router;
