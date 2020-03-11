const models = require("../models");
const Train = models.train;
const User = models.user;
const Transaction = models.transaction;

exports.addTrain = async (req, res) => {
  try {
    const idUser = req.user;
    const { name, seat, classData } = req.body;
    const trainData1 = await Train.findOne({
      raw: true,
      where: { name, seat, class: classData }
    });
    const dataUser = await User.findOne({ where: { id: idUser } });
    if (dataUser.level !== "admin") {
      throw new err();
    } else {
      if (trainData1) {
        res.status(409).send({ message: "train already in database" });
      } else {
        await Train.create({ name, seat, class: classData });
        trainData = await Train.findAll({ raw: true });
        res.status(201).send({
          message: "Add train success",
          data: trainData
        });
      }
    }
  } catch (err) {
    res
      .status(401)
      .send({ message: "no authorization to access this resource" });
  }
};

exports.getAllTrain = async (req, res) => {
  try {
    const trainData = await Train.findAll({ raw: true });
    res
      .status(200)
      .send({ message: "get all trains complete", data: trainData });
  } catch (err) {
    res
      .status(401)
      .send({ message: "no authorization to access this resource" });
  }
};

exports.deleteTrain = async (req, res) => {
  try {
    const { id } = req.params;
    const idUser = req.user;
    const trainData1 = await Train.findOne({
      raw: true,
      where: { id }
    });
    const dataUser = await User.findOne({ where: { id: idUser } });
    if (dataUser.level !== "admin") {
      throw new err();
    } else {
      const dataDel = await Train.destroy({ where: { id } });
      if (dataDel) {
        trainData = await Train.findAll({ raw: true });
        res
          .status(200)
          .send({ message: "delete train complete", data: trainData });
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

exports.detailTrain = async (req, res) => {
  try {
    const { id } = req.params;
    const idUser = req.user;
    const trainData1 = await Train.findOne({
      raw: true,
      where: { id }
    });
    const dataUser = await User.findOne({ where: { id: idUser } });
    if (dataUser.level !== "admin") {
      throw new err();
    } else {
      if (trainData1) {
        res
          .status(200)
          .send({ message: "get detail train complete", data: trainData1 });
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

exports.updateTrain = async (req, res) => {
  try {
    const idUser = req.user;
    const { id } = req.params;
    const { name, seat, classData } = req.body;
    const dataUser = await User.findOne({ where: { id: idUser } });
    if (dataUser.level !== "admin") {
      throw new err();
    } else {
      await Train.update({ name, seat, class: classData }, { where: { id } });
      trainData = await Train.findAll({ raw: true });
      res.status(200).send({
        message: "Update train Success",
        data: trainData
      });
    }
  } catch (err) {
    res
      .status(401)
      .send({ message: "no authorization to access this resource" });
  }
};
