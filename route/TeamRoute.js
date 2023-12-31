const express = require('express');
const router = express.Router();
const TeamController = require('../Controllers/TeamController');

router.get('/', TeamController.getAllTeamsWithMembers)
router.get('/:teamId/members', TeamController.getTeamMembers)
router.post('/create', TeamController.createTeam);
router.post('/sendMessage', async (req, res) => {
    const { team, senderId, content } = req.body;
    let obj = { team, senderId, content };
    let errArr = [];
    if (!obj.team) {
        errArr.push('Please select team ! , team is not define');
    }
    if (!obj.senderId) {
        errArr.push('Sender not found');
    }
    if (!obj.content) {
        errArr.push('Message not found');
    }
    if (errArr.length > 0) {
        res.send({
            isSuccessfull: false,
            message: 'Validation Error! :(',
            data: errArr,
        });
    }
    TeamController.sendMessage(req.app.io, { team, content, senderId });
    res.status(200).json({ success: true, message: content, senderId });
});

module.exports = router;