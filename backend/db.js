const mongoose = require('mongoose');

const connectDB = async () => {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      console.error('MONGODB_URI is not defined!');
      process.exit(1);
    }

    console.log("Using MongoDB URI:", mongoURI);  // Add this line for debugging

    try {
      await mongoose.connect(mongoURI);
      console.log('MongoDB Connected');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err.message);
      process.exit(1); // Stop the application if connection fails
    }
};

module.exports = connectDB;
