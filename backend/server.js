const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
const User = require("./schema.js");
const connectDB = require("./db.js");
const deviceDetector = require("./device-detection.js");
const signupCreation = require("./signupCreation.js");
const bcrypt = require("bcryptjs");

const useragent = require("express-useragent");
const requestIp = require("request-ip");

app.use(useragent.express());
app.use(requestIp.mw());

const { jwtSignin, jwtVerify } = require("./services/jwt/jwt.services.js");

const port = 4100;

connectDB();
