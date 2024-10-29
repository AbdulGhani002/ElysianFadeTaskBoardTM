/// <reference lib="deno.ns" />
import { Application } from 'https://deno.land/x/oak/mod.ts';
import { env } from './config/env.ts';
import taskRoutes from './routes/taskRoutes.ts';
import userRoutes from './routes/userRoutes.ts';
import teamRoutes from './routes/teamRoutes.ts';
import notificationRoutes from './routes/notificationRoutes.ts';
import goalRoutes from './routes/goalRoutes.ts';
import baseRoutes from './routes/baseRoutes.ts';

const app = new Application();
const port: number = parseInt(env.PORT) || 8080;

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
      return;
    }

    // Render the error page
    await context.render('ErrorPage.ejs', { error: err.message });
  }
});

// Start the server
app.listen({ port });
console.log(`Server is running on port ${port}`);
