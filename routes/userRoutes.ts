import { Router } from 'oak';
import UserController from '../controllers/UserController.ts';

const router = new Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.put('/profile/:userId', UserController.updateProfile);

export default router;
