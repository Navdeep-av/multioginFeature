const User = require("../../services/DB/db.module");
const bcrypt = require("bcryptjs");

const signupCreation = async (req, res, next) => {
  try {
    const { name, email, pass } = req.body;

    let user_Check = await User.findOne({ email: email });
    if (user_Check) {
      return res.status(409).json({
        error: "Email Id already exists, please try another email",
      });
    } else {
      const hashPass = await bcrypt.hash(pass, 10);
      const new_user = new User({
        name,
        email,
        pass: hashPass,
      });

      await new_user.save();

      next();
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Eror" });
  }
};

module.exports = signupCreation;
