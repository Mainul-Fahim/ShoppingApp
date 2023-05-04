const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

//connecting mongoDB to our server
const connectDB = async () => {
  // async await is used to do things at the same 
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
  //tryCatch block used to separate connection happens or not.
};

module.exports = connectDB;