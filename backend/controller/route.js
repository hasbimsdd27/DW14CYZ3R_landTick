require("dotenv").config();
const models = require("../models");
const Route = models.route;
const Train = models.train;
const Station = models.station;
const User = models.user;
const Transaction = models.transaction;

exports.addRoute = async (req, res) => {
  try {
    const idUser = req.user;
    const {
      origin,
      departure,
      destination,
      arrival,
      price,
      id_train
    } = req.body;
    const routeData1 = await Route.findOne({
      raw: true,
      where: { origin, departure, destination, arrival, price, id_train }
    });
    const dataUser = await User.findOne({ where: { id: idUser } });
    if (dataUser.level !== "admin") {
      throw new err();
    } else {
      if (routeData1) {
        res.status(409).send({ message: "Route already in database" });
      } else {
        await Route.create({
          origin,
          departure,
          destination,
          arrival,
          price,
          id_train
        });
        routeData = await Route.findAll({
          attributes: {
            exclude: ["createdAt", "updatedAt", "origin", "destination"]
          },
          include: [
            {
              model: Station,
              as: "originStation",
              attributes: { exclude: ["createdAt", "updatedAt", "id"] }
            },
            {
              model: Station,
              as: "destinationStation",
              attributes: { exclude: ["createdAt", "updatedAt", "id"] }
            },
            {
              model: Train,
              as: "trainName",
              attributes: { exclude: ["createdAt", "updatedAt", "id"] }
            }
          ]
        });
        res.status(201).send({
          message: "Add route success",
          data: routeData
        });
      }
    }
  } catch (err) {
    res
      .status(401)
      .send({ message: "no authorization to access this resource" });
  }
};

exports.getAllTrainRoute = async (req, res) => {
  try {
    const data = await Route.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "origin", "destination"]
      },
      include: [
        {
          model: Station,
          as: "originStation",
          attributes: { exclude: ["createdAt", "updatedAt", "id"] }
        },
        {
          model: Station,
          as: "destinationStation",
          attributes: { exclude: ["createdAt", "updatedAt", "id"] }
        },
        {
          model: Train,
          as: "trainName",
          attributes: { exclude: ["createdAt", "updatedAt", "id"] }
        }
      ]
    });
    res.status(200).send({ message: "get all train success", data });
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: "an error occured" });
  }
};

exports.getSpecificTrainRoute = async (req, res) => {
  try {
    const { origin, destination, date } = req.params;
    const data = await Route.findAll({
      where: { origin, destination },
      attributes: {
        exclude: ["createdAt", "updatedAt", "origin", "destination"]
      },
      include: [
        {
          model: Station,
          as: "originStation",
          attributes: { exclude: ["createdAt", "updatedAt", "id"] }
        },
        {
          model: Station,
          as: "destinationStation",
          attributes: { exclude: ["createdAt", "updatedAt", "id"] }
        },
        {
          model: Train,
          as: "trainName",
          attributes: { exclude: ["createdAt", "updatedAt", "id"] }
        }
      ]
    });
    res.status(200).send({ message: "get route(s) success", data });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteRoute = async (req, res) => {
  try {
    const { id } = req.params;
    const idUser = req.user;
    const dataUser = await User.findOne({ where: { id: idUser } });
    if (dataUser.level !== "admin") {
      throw new err();
    } else {
      const dataDel = await Route.destroy({ where: { id } });
      if (dataDel) {
        trainData = await Route.findAll({
          attributes: {
            exclude: ["createdAt", "updatedAt", "origin", "destination"]
          },
          include: [
            {
              model: Station,
              as: "originStation",
              attributes: { exclude: ["createdAt", "updatedAt", "id"] }
            },
            {
              model: Station,
              as: "destinationStation",
              attributes: { exclude: ["createdAt", "updatedAt", "id"] }
            },
            {
              model: Train,
              as: "trainName",
              attributes: { exclude: ["createdAt", "updatedAt", "id"] }
            }
          ]
        });
        res
          .status(200)
          .send({ message: "delete route complete", data: trainData });
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

exports.updateRoute = async (req, res) => {
  try {
    const idUser = req.user;
    const { id } = req.params;
    const {
      origin,
      departure,
      destination,
      arrival,
      price,
      id_train
    } = req.body;
    console.log({ origin, departure, destination, arrival, price, id_train });
    const dataUser = await User.findOne({ where: { id: idUser } });
    if (dataUser.level !== "admin") {
      throw new err();
    } else {
      await Route.update(
        { origin, departure, destination, arrival, price, id_train },
        { where: { id } }
      );

      const trainData = await Route.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt", "origin", "destination"]
        },
        include: [
          {
            model: Station,
            as: "originStation",
            attributes: { exclude: ["createdAt", "updatedAt", "id"] }
          },
          {
            model: Station,
            as: "destinationStation",
            attributes: { exclude: ["createdAt", "updatedAt", "id"] }
          },
          {
            model: Train,
            as: "trainName",
            attributes: { exclude: ["createdAt", "updatedAt", "id"] }
          }
        ]
      });
      res.status(200).send({
        message: "Update Route Success",
        data: trainData
      });
    }
  } catch (err) {
    res
      .status(401)
      .send({ message: "no authorization to access this resource" });
  }
};

exports.detailRoute = async (req, res) => {
  try {
    const { id } = req.params;
    const idUser = req.user;
    const routeData = await Route.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      },
      include: [
        {
          model: Station,
          as: "originStation",
          attributes: { exclude: ["createdAt", "updatedAt", "id"] }
        },
        {
          model: Station,
          as: "destinationStation",
          attributes: { exclude: ["createdAt", "updatedAt", "id"] }
        },
        {
          model: Train,
          as: "trainName",
          attributes: { exclude: ["createdAt", "updatedAt", "id"] }
        }
      ]
    });

    if (routeData) {
      res
        .status(200)
        .send({ message: "get detail route complete", data: routeData });
    } else {
      res.status(404).send({ message: "data not found" });
    }
  } catch (err) {
    //   res
    //     .status(401)
    //     .send({ message: "no authorization to access this resource" });
    // }
    console.log(err);
  }
};
