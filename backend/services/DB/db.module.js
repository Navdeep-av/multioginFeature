const mangoose = require("mongoose");

const UserSchema = new mangoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  pass: { type: String, required: true },
  loggedInDevice: [
    {
      id: String,
      deviceName: String,
      ip: String,
      deviceType: String,
      lastLogin: Date,
    },
  ],
});

module.exports = mangoose.model("User", UserSchema);
