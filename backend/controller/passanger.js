require("dotenv").config();
const models = require("../models");
const Route = models.route;
const Train = models.train;
const Station = models.station;
const User = models.user;
const Passanger = models.passanger;

exports.BulkInsert = async (req, res) => {
  try {
    console.log(req.body);
    const result = await Passanger.bulkCreate(req.body);
    if (result) {
      res.status(201).send({ message: "bulk create success", data: result });
    } else {
      throw new err();
    }
  } catch (err) {
    console.log(err);
  }
};
