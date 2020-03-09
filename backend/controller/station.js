const models = require("../models");
const Station = models.station;
const User = models.user;

exports.addStation = async (req, res) => {
  try {
    const idUser = req.user;
    const { name, code, wilayah } = req.body;
    const stationData = await Station.findOne({
      raw: true,
      where: { name, code, wilayah }
    });
    const dataUser = await User.findOne({ where: { id: idUser } });
    if (dataUser.level !== "admin") {
      throw new err();
    } else {
      if (stationData) {
        res.status(409).send({ message: "station already in database" });
      } else {
        await Station.create({ name, code, wilayah });
        stationData2 = await Station.findAll({ raw: true });
        res.status(201).send({
          message: "Add station success",
          data: stationData2
        });
      }
    }
  } catch (err) {
    res
      .status(401)
      .send({ message: "no authorization to access this resource" });
  }
};

exports.getAllStation = async (req, res) => {
  try {
    const dataStations = await Station.findAll({ raw: true });
    res
      .status(200)
      .send({ message: "get all stations complete", data: dataStations });
  } catch (err) {
    res
      .status(401)
      .send({ message: "no authorization to access this resource" });
  }
};

exports.deleteStation = async (req, res) => {
  try {
    const { id } = req.params;
    const idUser = req.user;
    const stationData = await Station.findOne({
      raw: true,
      where: { id }
    });
    const dataUser = await User.findOne({ where: { id: idUser } });
    if (dataUser.level !== "admin") {
      throw new err();
    } else {
      const dataDel = await Station.destroy({ where: { id } });
      if (dataDel) {
        stationData2 = await Station.findAll({ raw: true });
        res
          .status(200)
          .send({ message: "delete station complete", data: stationData2 });
      } else {
        res.status(404).send({ message: "data not found" });
      }
    }
  } catch (err) {
    res
      .status(401)
      .send({ message: "no authorization to access this resource" });
  }
};

exports.detailStation = async (req, res) => {
  try {
    const { id } = req.params;
    const idUser = req.user;
    const stationData = await Station.findOne({
      raw: true,
      where: { id }
    });
    const dataUser = await User.findOne({ where: { id: idUser } });
    if (dataUser.level !== "admin") {
      throw new err();
    } else {
      if (stationData) {
        res
          .status(200)
          .send({ message: "get detail station complete", data: stationData });
      } else {
        res.status(404).send({ message: "data not found" });
      }
    }
  } catch (err) {
    res
      .status(401)
      .send({ message: "no authorization to access this resource" });
  }
};

exports.updateStation = async (req, res) => {
  try {
    const idUser = req.user;
    const { id } = req.params;
    const { name, code, wilayah } = req.body;
    const dataUser = await User.findOne({ where: { id: idUser } });
    if (dataUser.level !== "admin") {
      throw new err();
    } else {
      await Station.update({ name, code, wilayah }, { where: { id } });
      stationData2 = await Station.findAll({ raw: true });
      res.status(200).send({
        message: "Update Station Success",
        data: stationData2
      });
    }
  } catch (err) {
    res
      .status(401)
      .send({ message: "no authorization to access this resource" });
  }
};
