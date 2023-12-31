// teamController.js
const AuthModel = require('../models/authModel');
const Team = require('../models/teamModel');

const TeamController = {
  createTeam: async (req, res) => {
    try {
      const { name, members } = req.body;

      const newTeam = await Team.create({
        name,
        members: members || [],
      });

      if (members && members.length > 0) {
        const users = await AuthModel.find({ _id: { $in: members } });
        await Promise.all(users.map(async (user) => {
          // Update each member's team array
          await AuthModel.findByIdAndUpdate(user._id, { $push: { teams: newTeam._id } });
        }));
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
  getTeamMembers: async (req, res) => {
    try {
      const { teamId } = req.params;
      const team = await Team.findById(teamId).populate("members  messages.sender")

      if (!team) {
        return res.status(404).json({
          success: false,
          message: 'Team not found',
        });
      }
      const members = team.members.map(member => ({
        _id: member._id,
        firstName: member.firstName,
        lastName: member.lastName,
        // Add other member properties as needed
      }));

      const messages = team.messages.map(message => ({
        content: message.content,
        createdAt: message.createdAt,
        sender: {
          _id: message.sender._id,
          firstName: message.sender.firstName,
          lastName: message.sender.lastName
          // Add other sender properties as needed
        },
      }));
      const memberDetails = await AuthModel.find({ _id: { $in: team.members } });

      res.status(200).json({
        success: true,
        team: {
          name: team.name,
          members,
          tasks: team.tasks, // Include other team properties as needed
          messages,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching team members',
        error: error.message,
      });
    }
  },
  getAllTeamsWithMembers: async (req, res) => {
    try {
      // Get all teams with members details
      const teams = await Team.find().populate({
        path: 'members',
        select: 'firstName lastName email userStatus createdAt updatedAt' // Include the fields you need
      }).populate({
        path: 'courses',
        select: 'title description taskStatus updatedAt createdAt _id',
      }).populate({
        path: 'messages.sender',
        select: 'firstName lastName email password createdAt updatedAt',
      })
      res.status(200).json({
        success: true,
        message: 'All teams with members fetched successfully',
        teams,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching teams with members',
        error: error.message,
      });
    }
  },
  sendMessage: async (io, data) => {
    try {
      const { teamId , senderId, content } = data;

      const message = {
        sender: senderId,
        content: content,
        createdAt: new Date()
      };
      const updatedTeam = await Team.findOneAndUpdate(
        { _id: teamId },
        { $push: { messages: message } },
        { new: true }
      )

      io.to(team).emit('receiveMessage', { team: teamId, message: message });
      return { success: true, message: 'Message sent', updatedTeam: updatedTeam };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Error sending message' };
    }
  },
};

module.exports = TeamController;