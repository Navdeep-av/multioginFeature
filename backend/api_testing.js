const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const connectDB = require("./db.js");

app.use(cors());
app.use(express.json());

const port = 4100;

connectDB();

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: String,
    email: String,
    password: String,
  })
);

app.get("/", async (req, res) => {
  console.log("Enteredss in ");

  const new_user = new User({
    name: "Pawans",
    email: "pawasn@gmail.com",
    password: "smbdhgs",
  });

  await new_user.save();

  res.send("Correct");
});

app.post("/signup", (req, res) => {
  const { name, email, pass } = req.body;
  res.send({ name, email, pass });
});

app.listen(port, () => {
  console.log(`Server runnign on ${port}`);
});
