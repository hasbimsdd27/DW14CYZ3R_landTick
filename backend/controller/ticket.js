const models = require("../models");
const User = models.user;
const Train = models.train;
const Station = models.station;
const Route = models.route;
const Transaction = models.transaction;

exports.getTicket = async (req, res) => {
  try {
    const id_user = req.user;
    const dataTicket = await Transaction.findAll({
      where: { id_user },
      attributes: [
        "id",
        "image_name",
        "transaction_code",
        "total",
        "seats_order",
        "departure_date",
        "status"
      ],
      include: [
        {
          model: Station,
          as: "originStation",
          attributes: { exclude: ["createdAt", "updatedAt", "id"] }
        },
        {
          model: Route,
          as: "route",
          attributes: { exclude: ["createdAt", "updatedAt"] }
        },
        {
          model: Station,
          as: "destinationStation",
          attributes: { exclude: ["createdAt", "updatedAt", "id"] }
        },
        {
          model: Train,
          as: "train",
          attributes: { exclude: ["createdAt", "updatedAt", "seat", "id"] }
        },
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "level", "password", "id"]
          }
        }
      ]
    });
    res.status(200).send({ message: "ticket found", data: dataTicket });
  } catch (err) {
    console.log(err);
  }
};

exports.getDetailTiket = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userId = req.user;
    const dataTicket = await Transaction.findOne({
      where: { id },
      // attributes: ["id", "seats_order", "departure_date", "status"],
      include: [
        {
          model: Station,
          as: "originStation",
          attributes: { exclude: ["createdAt", "updatedAt", "id"] }
        },
        {
          model: Route,
          as: "route",
          attributes: {
            exclude: ["createdAt", "updatedAt", "origin", "destination", "id"]
          }
        },
        {
          model: Station,
          as: "destinationStation",
          attributes: { exclude: ["createdAt", "updatedAt", "id"] }
        },
        {
          model: Train,
          as: "train",
          attributes: { exclude: ["createdAt", "updatedAt", "seat", "id"] }
        },
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "level", "password"]
          }
        }
      ]
    });
    if (dataTicket.user.id === userId) {
      res.status(200).send({ message: "ticket found", data: dataTicket });
    } else {
      res
        .status(401)
        .send({ message: "You are not allowed to access this resource" });
    }
  } catch (err) {
    console.log(err);
  }
};
