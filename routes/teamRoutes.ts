import { Router } from 'https://deno.land/x/oak/mod.ts';
import TeamController from '../controllers/TeamController.ts';

const router = new Router();

router.post('/teams', TeamController.createTeam);
router.post('/teams/addMember', TeamController.addMember);
router.post('/teams/removeMember', TeamController.removeMember);
router.post('/teams/assignRole', TeamController.assignRole);

export default router;
