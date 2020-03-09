const models = require("../models");
const User = models.user;

exports.detailUser = async (req, res) => {
  try {
    const id = req.user;
    const dataUser = await User.findOne({
      where: { id },
      attributes: ["id", "name", "email", "level"]
    });
    if (dataUser) {
      res.status(200).send({ message: "user found!", data: dataUser });
    }
  } catch (err) {
    console.log(err);
  }
};
