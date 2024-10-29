import { Router } from 'https://deno.land/x/oak/mod.ts';

const router = new Router();

router.get('/error', (context) => {
  context.render('ErrorPage.ejs', { error: 'An error occurred' });
});

router.get('/success', (context) => {
  context.render('SuccessPage.ejs', { message: 'Operation successful' });
});

export default router;
