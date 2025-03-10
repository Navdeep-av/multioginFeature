const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
// const User = require("./schema.js");
const connectDB = require("./db.js");
// const deviceDetector = require("./device-detection.js");
// const signupCreation = require("./signupCreation.js");
// const bcrypt = require("bcryptjs");

const useragent = require("express-useragent");
const requestIp = require("request-ip");

app.use(useragent.express());
app.use(requestIp.mw());

const authsRouter = require("./api/authRouter/auth.routes.js");

// const { jwtSignin, jwtVerify } = require("./services/jwt/jwt.services.js");

const port = 4100;

connectDB();

app.use("/auths", authsRouter);

// app.post("/signup", signupCreation, async (req, res) => {
//   return res.status(201).json({
//     message: "Account created successfully",
//   });
// });

// app.post("/login", deviceDetector, async (req, res) => {
//   const { email, pass, browserID } = req.body;

//   console.log("Type of BrowserID", typeof browserID);
//   console.log("Pass ", pass);
//   console.log("Type of Pass ", typeof pass);
//   // check if user exists
//   let user = await User.findOne({ email: email });
//   console.log("Users", user);
//   if (!user) {
//     return res.json({ statusCode: 404, message: "User Not Found" });
//   }
//   console.log("UserPass ", user.pass);
//   const isPassMatch = await bcrypt.compare(pass, user.pass);

//   if (!isPassMatch) {
//     return res.json({ statusCode: 404, message: "Invalid Password" });
//   }
//   console.log("Is Pass Match", isPassMatch);
//   let currentDevice = {
//     id: browserID,
//     deviceName: req.deviceInfo.os || "Unknown OS",
//     ip: req.clientIp || "Unknown IP",
//     deviceType: req.deviceInfo.model || "Unknown Device",
//     lastLogin: new Date(),
//   };

//   let existingDevice = user.loggedInDevice.find(
//     (item) => item.id === browserID
//   );

//   if (existingDevice) {
//     user.loggedInDevice.id = new Date();
//   } else {
//     user.loggedInDevice.push(currentDevice);
//   }

//   console.log("Before saving, user.loggedInDevice:", user.loggedInDevice);
//   await user.save();

//   const token = jwtSignin({ email: user.email });

//   res.json({
//     loggedInDevices: user.loggedInDevice,
//     token,
//   });
// });

// app.get("/checkauth", async (req, res) => {
//   const token = req.headers["authorization"];
//   const browserID = req.headers["browserid"];
//   console.log("REQ HEaders", req.headers);
//   console.log("checkAuth", token, browserID);

//   try {
//     const token_Verify = jwtVerify(token);

//     console.log("Email:", token_Verify.email);
//     const user_data = await User.findOne({ email: token_Verify.email });
//     console.log("user_data", user_data);

//     let isPresent = user_data.loggedInDevice.some(
//       (item) => item.id === browserID
//     );

//     if (!isPresent) {
//       return res.status(403).json({ message: "Unauthorized Device" });
//     }

//     res.status(200).json({ message: "Token is Valid", data: user_data });
//   } catch (err) {
//     console.log("Error", err);
//     return res.status(403).json({ message: "Invalid or expired token" });
//   }
// });

// app.post("/logout", async (req, res) => {
//   const token = req.headers["authorization"];
//   const { deviceID } = req.body;
//   try {
//     const token_Verify = jwtVerify(token);

//     await User.updateOne(
//       { email: token_Verify.email },
//       { $pull: { loggedInDevice: { id: deviceID } } }
//     );

//     const updatedUsers = await User.findOne({ email: token_Verify.email });
//     return res
//       .status(200)
//       .json({ message: "Item Successfully Deleted", data: updatedUsers });
//   } catch (err) {
//     console.log("Error", err);
//     return res.status(403).json({ message: "Invalid or expired token" });
//   }
// });

// app.post("/logoutfromall", async (req, res) => {
//   const token = req.headers["authorization"];

//   try {
//     const token_Verify = jwtVerify(token);

//     await User.updateOne(
//       {
//         email: token_Verify.email,
//       },
//       { $set: { loggedInDevice: [] } }
//     );
//     const updatedUsers = await User.findOne({ email: token_Verify.email });
//     return res
//       .status(200)
//       .json({ message: "Successfully Logout", data: updatedUsers });
//   } catch (err) {
//     console.log("Error", err);
//     return res.status(403).json({ message: "Invalid or expired token" });
//   }
// });

app.listen(port, () => {
  console.log(`Server runnign on ${port}`);
});
