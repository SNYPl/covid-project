const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.postLogin = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await User.findOne({
      $or: [{ username: username }, { email: username }],
    });
    console.log(user);
    console.log(password);
    if (!user) {
      throw new Error("User not found");
    }

    const isSame = await bcrypt.compare(password, user.password);

    if (!isSame) {
      throw new Error("incorrect password");
    }

    const userToken = { username: username };
    const accessToken = jwt.sign(userToken, "secret", {
      expiresIn: "180m",
    });

    res.status(200).json({
      message: "Logged in successfully",
      token: accessToken,
      username: username,
      verified: user.verified,
    });
  } catch (err) {
    return res.status(401).send({ incorrect: "user or password is incorrect" });
  }
};
