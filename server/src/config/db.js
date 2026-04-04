const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      // eslint-disable-next-line no-console
      console.warn('MONGO_URI is not defined in environment variables');
      return;
    }
    const conn = await mongoose.connect(process.env.MONGO_URI);
    // eslint-disable-next-line no-console
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
