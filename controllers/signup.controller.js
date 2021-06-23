const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");

const signup = async (req, res) => {
  try {
    const body = req.body;
    if (!(body.firstName && body.lastName && body.email && body.password)) {
      return res
        .status(401)
        .json({ success: false, errorMessage: "Enter all details" });
    }
    const userExists = await User.findOne({ email: body.email });
    if (userExists) {
      return res.status(409).json({
        success: false,
        errorMessage: "Account already exists.Please Login to continue",
      });
    }
    const user = new User(body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    let token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });
    token = `Bearer ${token}`;

    res.status(200).json({ success: true, token });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, errorMessage: "something went wrong" });
  }
};

module.exports = { signup };
