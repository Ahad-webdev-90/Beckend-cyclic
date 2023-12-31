const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: '/authusers' }],
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: '/courses' }],
  messages: [{
    sender: { type: mongoose.Schema.Types.ObjectId, ref: '/authusers' },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }],
}, {
  timestamps: true
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;