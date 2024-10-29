const express = require('express');
const router = express.Router();
const TeamController = require('../controllers/TeamController');

router.post('/teams', TeamController.createTeam);
router.post('/teams/addMember', TeamController.addMember);
router.post('/teams/removeMember', TeamController.removeMember);
router.post('/teams/assignRole', TeamController.assignRole);

module.exports = router;
