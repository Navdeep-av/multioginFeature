const mongoose = require("mongoose");

const { MONGOURI } = require("./config");

const connectDB = () => {
  mongoose
    .connect(MONGOURI, {})
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));
};

module.exports = connectDB;
