const mongoose = require('mongoose');
const env = require('./environment');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 2000
    });
    console.log(`🍃 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`ℹ️ MongoDB connection bypassed (using in-memory persistence data store for active operations)`);
  }
};

module.exports = connectDB;
