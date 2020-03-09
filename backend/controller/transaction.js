const models = require("../models");
const Station = models.station;
const Train = models.train;
const User = models.user;
const Route = models.route;
const Transaction = models.transaction;

const MakeCode = length => {
  let result = "DO-Line-";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

exports.buyTicket = async (req, res) => {
  try {
    const {
      id_train,
      departure_date,
      status,
      id_user,
      seats_order,
      destination,
      route_id,
      origin,
      total
    } = req.body;
    await Transaction.create({
      transaction_code: MakeCode(10),
      id_train,
      departure_date,
      status,
      id_user,
      seats_order,
      destination,
      route_id,
      origin,
      total,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    const detailTrx = await Transaction.findOne({
      where: {
        id_train,
        departure_date,
        status,
        id_user,
        seats_order,
        destination,
        route_id,
        origin,
        total
      },
      attributes: { exclude: ["createdAt", "updatedAt"] },

      include: [
        {
          model: Station,
          as: "originStation",
          attributes: { exclude: ["createdAt", "updatedAt"] }
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
          attributes: { exclude: ["createdAt", "updatedAt"] }
        },
        {
          model: Train,
          as: "train",
          attributes: { exclude: ["createdAt", "updatedAt", "seat"] }
        },
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "level"]
          }
        }
      ]
    });
    res.status(201).send({
      message: "transaction successfully created",
      data: detailTrx
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getAllTransaction = async (req, res) => {
  try {
    const id = req.user;
    const dataUser = await User.findOne({ where: { id } });
    if (dataUser.level !== "admin") {
      throw new err();
    } else {
      const transactions = await Transaction.findAll({
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
            attributes: { exclude: ["createdAt", "updatedAt"] }
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
            attributes: { exclude: ["createdAt", "updatedAt"] }
          },
          {
            model: Train,
            as: "train",
            attributes: { exclude: ["createdAt", "updatedAt", "seat"] }
          },
          {
            model: User,
            as: "user",
            attributes: {
              exclude: ["createdAt", "updatedAt", "password", "level"]
            }
          }
        ]
      });
      res
        .status(200)
        .send({ message: "get all transactions success", data: transactions });
    }
  } catch (err) {
    res
      .status(401)
      .send({ message: "Not authorized to access this resource", error: err });
  }
};

exports.getDetailTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const idUser = req.user;
    const dataUser = await User.findOne({ where: { id: idUser } });
    if (dataUser.level !== "admin") {
      throw new err();
    } else {
      const transaction = await Transaction.findOne({
        where: { id },
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
            attributes: { exclude: ["createdAt", "updatedAt"] }
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
            attributes: { exclude: ["createdAt", "updatedAt"] }
          },
          {
            model: Train,
            as: "train",
            attributes: { exclude: ["createdAt", "updatedAt", "seat"] }
          },
          {
            model: User,
            as: "user",
            attributes: {
              exclude: ["createdAt", "updatedAt", "password", "level"]
            }
          }
        ]
      });
      res
        .status(200)
        .send({ message: "get transaction success", data: transaction });
    }
  } catch (err) {
    res
      .status(401)
      .send({ message: "Not authorized to access this resource", error: err });
  }
};

exports.UpdatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const idUser = req.user;
    const { status } = req.body;
    const dataUser = await User.findOne({ where: { id: idUser } });
    if (dataUser.level !== "admin") {
      throw new err();
    } else {
      await Transaction.update(
        {
          status,
          updatedAt: new Date()
        },
        { where: { id } }
      );

      const transaction = await Transaction.findOne({
        where: { id },
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
            attributes: { exclude: ["createdAt", "updatedAt"] }
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
            attributes: { exclude: ["createdAt", "updatedAt"] }
          },
          {
            model: Train,
            as: "train",
            attributes: { exclude: ["createdAt", "updatedAt", "seat"] }
          },
          {
            model: User,
            as: "user",
            attributes: {
              exclude: ["createdAt", "updatedAt", "password", "level"]
            }
          }
        ]
      });
      res
        .status(200)
        .send({ message: "update transaction success", data: transaction });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.userUpdatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await Transaction.update(
      {
        status,
        updatedAt: new Date()
      },
      { where: { id } }
    );

    const transaction = await Transaction.findOne({
      where: { id },
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
          attributes: { exclude: ["createdAt", "updatedAt"] }
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
          attributes: { exclude: ["createdAt", "updatedAt"] }
        },
        {
          model: Train,
          as: "train",
          attributes: { exclude: ["createdAt", "updatedAt", "seat"] }
        },
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "level"]
          }
        }
      ]
    });
    res
      .status(200)
      .send({ message: "update transaction success", data: transaction });
  } catch (err) {
    console.log(err);
  }
};
