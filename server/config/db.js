const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => {
      console.log(`Database Connected: ${db.host}`);
    });
  } catch (error) {
    console.log(error);
  }
}



module.exports = connectDB;