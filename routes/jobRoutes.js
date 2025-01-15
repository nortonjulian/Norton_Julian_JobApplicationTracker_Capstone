const express = require('express')
const Job = require('../models/Job')
const router = express.Router();

// Create a new job application route

router.post('/jobs', async (req, res) => {
    try {
        const newJob = new Job({
            company: req.body.company,
            position: req.body.position,
            status: req.body.status,
            user: req.body.user,
        });

        const savedJob = await newJob.save()
        res.json(savedJob)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

// Get all job applications
router.get('/jobs', async (req, res) => {
    try {
        const jobs = await Job.find().populate('user', 'username email')
        res.json(jobs)
    } catch (error) {
        res.status(400).json({ error: err.message })
    }
})

// Update a job application
router.put('/jobs/:id', async (req, res) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(updatedJob)
    } catch (error) {
        res.status(400).json({ error: err.message })
    }
})

// Delete a job application
router.delete('/jobs/:id', async (req, res) => {
    try {
        await Job.findByIdAndDelete(req.params.id);
        res.json({ message: 'Job deleted successfully' })
    } catch (error) {
        res.status(400).json({ error: err.message })
    }
})

module.exports = router
