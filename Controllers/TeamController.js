// teamController.js
const AuthModel = require('../models/authModel');
const Team = require('../models/teamModel');

const TeamController = {
  createTeam: async (req, res) => {
    try {
      // Assuming that the request body contains team name and an array of AuthModel IDs
      const { name, members } = req.body;

      // Create a new team
      const newTeam = await Team.create({
        name,
        members: members || [], // If members array is not provided, default to an empty array
      });

      // Add the team ID to each AuthModel's list of teams
      if (members && members.length > 0) {
        await AuthModel.updateMany(
          { _id: { $in: members } },
          { $push: { teams: newTeam._id } }
        );
      }

      res.status(201).json({
        success: true,
        message: 'Team created successfully',
        team: newTeam,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Team creation failed',
        error: error.message,
      });
    }
  },
  GetTeam: async (req, res) => {
    try {
      const members = await Team.find();
      res.json({ success: true, data: members });
    } catch (error) {
      console.error('Error fetching team members:', error);
      // Respond with an error
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },
  getTeamById: async (req, res) => {

    try {
      let id = req.params.id

      let result = await Team.findById(id)
      // console.log(result);
      res.send({
        isSuccessfull: true,
        data: result,
        message: "",
      })
      // let obj = courses.find((x) => x.id == id)


    } catch (error) {
      res.send({
        isSuccessfull: false,
        data: null,
        message: "No Data Found",
      })
    }
  },
};

module.exports = TeamController;