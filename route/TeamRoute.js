const express = require('express');
const router = express.Router();
const TeamController = require('../Controllers/TeamController');

router.get('/', TeamController.getAllTeamsWithMembers)
router.get('/:id/member', TeamController.getTeamMembers)
router.post('/create', TeamController.createTeam);

module.exports = router;