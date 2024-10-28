import { Router } from 'https://deno.land/x/oak/mod.ts';
import NotificationController from '../controllers/NotificationController.ts';

const router = new Router();

router.post('/notifications/taskReminder', NotificationController.sendTaskReminder);
router.post('/notifications/deadlineNotification', NotificationController.sendDeadlineNotification);
router.post('/notifications/notifyTeam', NotificationController.notifyTeam);

export default router;
