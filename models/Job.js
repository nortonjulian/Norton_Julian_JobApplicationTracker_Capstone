const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Applied', 'Interviewing', 'Offer Received', 'Rejected'],
        default: 'Applied',
    },
    dateApplied: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Job = mongoose.model('Job', jobSchema)

module.exports = Job;
