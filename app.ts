/// <reference lib="deno.ns" />
import { Application } from 'https://deno.land/x/oak/mod.ts';
import { env } from './config/env.ts';
import taskRoutes from './routes/taskRoutes.ts';
import userRoutes from './routes/userRoutes.ts';
import teamRoutes from './routes/teamRoutes.ts';
import notificationRoutes from './routes/notificationRoutes.ts';
import goalRoutes from './routes/goalRoutes.ts';
import baseRoutes from './routes/baseRoutes.ts';
import * as dejs from 'https://deno.land/x/dejs@0.10.3/mod.ts'; 

const app = new Application();
const port: number = parseInt(env.PORT) || 8080;

app.use(async (context, next) => {
  context.render = async (view: string, data: Record<string, unknown>) => {
    const filePath = `./views/${view}`; // Path to your views
    context.response.body = await dejs.render(filePath, data);
  };
  await next();
});

// Use your routes
app.use(taskRoutes.routes());
app.use(userRoutes.routes());
app.use(teamRoutes.routes());
app.use(notificationRoutes.routes());
app.use(goalRoutes.routes());
app.use(baseRoutes.routes());

// Error handling middleware
app.use(async (context, next) => {
  try {
    await next();
  } catch (err) {
    console.error('Error:', err);
    context.response.status = 500;

    // Ensure the response is writable
    if (!context.response.writable) {
      console.error("not writable");
      return;
    }

    // Render the error page
    await context.render('ErrorPage.ejs', { error: err.message });
  }
});

// Start the server
app.listen({ port });
console.log(`Server is running on port ${port}`);
