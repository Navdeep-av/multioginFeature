const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = () => {
  console.log("Inside Moniog");
  mongoose
    .connect(process.env.MONGOURI, {})
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));
};

module.exports = connectDB;
