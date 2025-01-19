const fs = resuire('fs')
const path = require('path')
const Job = require('../../models/Job');

// Create a new job application
const createJob = async (req, res) => {
    try {
        const newJob = new Job({
            company: req.body.company,
            position: req.body.position,
            status: req.body.status,
            user: req.user.id,  // Use authenticated user's ID
        });

        const savedJob = await newJob.save();
        res.status(201).json(savedJob); // Return the created job
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all job applications for a user
const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ user: req.user.id }).populate('user', 'username email');
        res.json(jobs);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update a job application
const updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: 'Job not found'})
        }

        Object.assign(job, req.body);

        if(req.file) {
            job.resume = req.file.path;
        }
        await job.save()
        res.jaon(job)
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a job application
const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: 'Job not found'})
        }

        if (job.resume) {
            const filePath = path.join(__dirname, '../', job.resume)
            fs.unlink(filePath, (err) => {
                if (err) console.log('Failed to delete file', err)
            })
        }

        await job.remove()
        res.status(200).json({ message: 'Job and associated resume deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createJob,
    getJobs,
    updateJob,
    deleteJob
};
