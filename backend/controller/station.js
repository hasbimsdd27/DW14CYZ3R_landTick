const models = require("../models");
const Station = models.station;

exports.addStation = async (req, res) => {
  try {
    const { name } = req.body;
    const stationData = await Station.findOne({ raw: true, where: { name } });

    if (stationData) {
      res.status(409).send({ message: "station already in database" });
    } else {
      const add = await Station.create({ name });
      stationData2 = await Station.findOne({ where: { name } });
      res.status(201).send({
        message: "Add station success",
        data: stationData2
      });
    }
  } catch (err) {
    res.status(401).send({ message: "Not authorized to access this resource" });
  }
};

exports.getAllStation = async (req, res) => {
  try {
    const dataStations = await Station.findAll({ raw: true });
    res
      .status(200)
      .send({ message: "get all stations complete", data: dataStations });
  } catch (err) {
    console.log(err);
  }
};
