const express = require('express');
const router = express.Router();
const TeamController = require('../Controllers/TeamController');

router.get('/', TeamController.GetTeam)
router.get('/:id', TeamController.getTeamById)
router.post('/create', TeamController.createTeam);

module.exports = router;