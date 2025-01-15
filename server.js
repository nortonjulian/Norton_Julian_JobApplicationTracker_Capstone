const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();
const jobRoutes = require('./routes/jobRoutes')
// const authRoutes = require('./routes/authRoutes')

const app = express()

// Middleware
app.use(cors())
app.use(express.json());

app.use('/api', jobRoutes)
// app.use('/api', authRoutes)

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/jobTracker', {
    // useNewURLParser: true,
    // useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected....'))
.catch((err) => console.log(err))

// Route to test the server
app.get('/', (req, res) => {
    res.send('Job Application Tracker API')
})

//Server Listening
const port = process.env.port || 5001;
app.listen(port , () => {
    console.log(`Server running on port ${port}`)
})
