const Express = require("express");
const {
  authValidation,
  signUpCreate,
  loginCheck,
  logoutController,
  logoutfromallController,
} = require("./auth.controller.js");

const signupCreation = require("../middlewares/signupcreation.js");

const deviceDetector = require("../../device-detection.js");

const router = Express.Router();

router.get("/checkauth", authValidation);

router.post("/signup", signupCreation, signUpCreate);

router.post("/login", deviceDetector, loginCheck);

router.post("/logout", logoutController);

router.post("/logoutfromall", logoutfromallController);

module.exports = router;
