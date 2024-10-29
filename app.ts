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

app.use(taskRoutes.routes());
app.use(userRoutes.routes());
app.use(teamRoutes.routes());
app.use(notificationRoutes.routes());
app.use(goalRoutes.routes());
app.use(baseRoutes.routes());

app.use(async (context, next) => {
  try {
    await next();
  } catch (err) {
    console.error('Error:', err);
    context.response.status = 500;
    context.render('ErrorPage.ejs', { error: err.message });
  }
});

app.listen({ port });
console.log(`Server is running on port ${port}`);
