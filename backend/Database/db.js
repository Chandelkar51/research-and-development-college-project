require("dotenv").config();
const mongoose = require("mongoose");
const mongoURI =
  process.env.MONGODB_URI ||
  "mongodb://127.0.0.1:27017/College-Management-System";

const connectToMongo = () => {
  mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(() => {
      console.log("Connected to MongoDB Successfully");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB", error);
    });
};

module.exports = connectToMongo;
