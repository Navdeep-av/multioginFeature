const jwt = require("jsonwebtoken");

const { expiredIn, secret_Key } = require("../../app.config.js");

const jwtSignin = (payload) => {
  const options = {
    expiresIn: expiredIn,
  };

  console.log("Options", options);
  const token = jwt.sign(payload, secret_Key, options);

  return token;
};

const jwtVerify = (token) => {
  const token_Verify = jwt.verify(token, secret_Key);

  return token_Verify;
};

module.exports = { jwtSignin, jwtVerify };
