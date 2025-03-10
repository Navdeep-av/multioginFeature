const { jwtVerify, jwtSignin } = require("../../services/jwt/jwt.services.js");
const User = require("../../services/DB/db.module.js");
const bcrypt = require("bcryptjs");

// const useragent = require("express-useragent");
// const requestIp = require("request-ip");

const authValidation = async (req, res) => {
  const token = req.headers["authorization"];
  const browserID = req.headers["browserid"];

  console.log("REQ HEaders", req.headers);
  console.log("checkAuth", token, browserID);

  try {
    const token_Verify = jwtVerify(token);
    const user_data = await User.findOne({ email: token_Verify.email });

    let isPresent = user_data.loggedInDevice.some(
      (item) => item.id === browserID
    );

    if (!isPresent) {
      return res.status(403).json({ message: "Unauthorized Device" });
    }

    res.status(200).json({ message: "Token is Valid", data: user_data });
  } catch (err) {
    console.log("Error", err);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

const signUpCreate = async (req, res) => {
  return res.status(201).json({
    message: "Account created successfully",
  });
};

const loginCheck = async (req, res) => {
  console.log("Inside Login");
  const { email, pass, browserID } = req.body;

  console.log("Type of BrowserID", typeof browserID);
  console.log("Pass ", pass);
  console.log("Type of Pass ", typeof pass);
  // check if user exists
  let user = await User.findOne({ email: email });
  console.log("Users", user);
  if (!user) {
    return res.json({ statusCode: 404, message: "User Not Found" });
  }
  console.log("UserPass ", user.pass);
  const isPassMatch = await bcrypt.compare(pass, user.pass);

  if (!isPassMatch) {
    return res.json({ statusCode: 404, message: "Invalid Password" });
  }
  console.log("Is Pass Match", isPassMatch);
  let currentDevice = {
    id: browserID,
    deviceName: req.deviceInfo.os || "Unknown OS",
    ip: req.clientIp || "Unknown IP",
    deviceType: req.deviceInfo.model || "Unknown Device",
    lastLogin: new Date(),
  };

  let existingDevice = user.loggedInDevice.find(
    (item) => item.id === browserID
  );

  if (existingDevice) {
    user.loggedInDevice.id = new Date();
  } else {
    user.loggedInDevice.push(currentDevice);
  }

  console.log("Before saving, user.loggedInDevice:", user.loggedInDevice);
  await user.save();

  const token = jwtSignin({ email: user.email });

  res.json({
    loggedInDevices: user.loggedInDevice,
    token,
  });
};

const logoutController = async (req, res) => {
  const token = req.headers["authorization"];
  const { deviceID } = req.body;
  try {
    const token_Verify = jwtVerify(token);

    await User.updateOne(
      { email: token_Verify.email },
      { $pull: { loggedInDevice: { id: deviceID } } }
    );

    const updatedUsers = await User.findOne({ email: token_Verify.email });
    return res
      .status(200)
      .json({ message: "Item Successfully Deleted", data: updatedUsers });
  } catch (err) {
    console.log("Error", err);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

const logoutfromallController = async (req, res) => {
  const token = req.headers["authorization"];

  try {
    const token_Verify = jwtVerify(token);

    await User.updateOne(
      {
        email: token_Verify.email,
      },
      { $set: { loggedInDevice: [] } }
    );
    const updatedUsers = await User.findOne({ email: token_Verify.email });
    return res
      .status(200)
      .json({ message: "Successfully Logout", data: updatedUsers });
  } catch (err) {
    console.log("Error", err);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = {
  authValidation,
  signUpCreate,
  loginCheck,
  logoutController,
  logoutfromallController,
};
