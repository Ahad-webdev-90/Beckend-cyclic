const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    taskStatus: {
        type: String,
        enum: ['Pending', 'Completed'],
        default: 'Pending'
    },
    assignedTo:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'authusers'
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
}, {
    timestamps: true
})
const courseModel = mongoose.model('/courses', courseSchema)

module.exports = courseModel