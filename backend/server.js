const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db');

// Other imports for routes and middleware
const jobRoutes = require('./routes/jobRoutes');
const authRoutes = require('./routes/authRoutes');
const appRoutes = require('./routes/appRoutes');
const protect = require('./middleware/authMiddleware');

// Connect to database using the connectDB function
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/jobs', protect, jobRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/app', protect, appRoutes);

// Route to test the server
app.get('/', (req, res) => {
  res.send('Job Application Tracker API');
});


// Server Listening
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//Backend
//brew services start mongodb-community@6.0
//node server.js
//brew services list

//Frontend
//npm run client-start
