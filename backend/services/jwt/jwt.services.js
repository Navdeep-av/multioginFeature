const jwt = require("jsonwebtoken");
require("dotenv").config();

// const { expiresIn, SECRET_KEY } = require("./jwt.config.js");

console.log("expire In", process.env.expiresIn);

const jwtSignin = (payload) => {
  const options = {
    expiresIn: process.env.EXPIRESIN,
  };

  console.log("Options", options);
  const token = jwt.sign(payload, process.env.SECRET_KEY, options);

  return token;
};

const jwtVerify = (token) => {
  const token_Verify = jwt.verify(token, process.env.SECRET_KEY);

  return token_Verify;
};

module.exports = { jwtSignin, jwtVerify };
