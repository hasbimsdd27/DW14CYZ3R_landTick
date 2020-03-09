const jwt = require("jsonwebtoken");
const models = require("../models");
const User = models.user;

exports.auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const data = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ where: { id: data.user_id } });
    if (!user) {
      throw new Error();
    }
    req.user = user.id;
    req.token = token;
    next();
  } catch (err) {
    res.status(401).send({ message: "Not authorized to access this resource" });
  }
};

exports.authAdmin = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const data = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ raw: true, where: { id: data.user_id } });
    console.log(user.level == "user");
    if (!user) {
      throw new Error();
    } else {
      if (user.level === "user") {
        throw new Error();
      } else {
        req.user = user.id;
        req.token = token;
        next();
      }
    }
  } catch (err) {
    res.status(401).send({ message: "Not authorized to access this resource" });
  }
};
