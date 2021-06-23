const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");

const login = async (req, res) => {
  try {
    const body = req.body;
    const user = await User.findOne({ email: body.email });
    if (user) {
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (validPassword) {
        let token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
          expiresIn: "24h",
        });
        token = `Bearer ${token}`;

        return res.status(200).json({ success: true, token });
      }
      return res.status(401).json({
        success: false,
        errorMessage: "email id or password is incorrect",
      });
    }
    res.status(401).json({
      success: false,
      errorMessage: "email id or password is incorrect",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      errorMessage: "something went wrong",
    });
  }
};

module.exports = { login };
