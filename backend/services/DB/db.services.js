const mongoose = require("mongoose");
const { mongoURI } = require("../../app.config.js");

const connectDB = () => {
  console.log("Inside Moniog");
  mongoose
    .connect(mongoURI, {})
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));
};

module.exports = connectDB;
