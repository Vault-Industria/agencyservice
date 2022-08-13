require("dotenv").config();
const mongoose = require("mongoose");

const { MONGO_URI } = process.env;
console.log("Database connection successful", MONGO_URI);
exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(MONGO_URI,{
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
}