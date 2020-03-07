require("dotenv").config();
const models = require("../models");
const Route = models.route;
const Train = models.train;
const Station = models.station;
const Transaction = models.transaction;

// exports.getTrain = async (req, res) => {
//   try {
//     const { origin, destination, departureDate } = req.query;
//     const train = await Route.findOne({
//       where: {
//         origin,
//         destination
//       },
//       attributes: {
//         exclude: ["createdAt", "updatedAt", "origin", "destination"]
//       },
//       include: [
//         {
//           model: Station,
//           as: "originStation",
//           attributes: { exclude: ["createdAt", "updatedAt", "id"] }
//         },
//         {
//           model: Station,
//           as: "destinationStation",
//           attributes: { exclude: ["createdAt", "updatedAt", "id"] }
//         },
//         {
//           model: Train,
//           as: "trainName",
//           attributes: { exclude: ["createdAt", "updatedAt", "id"] }
//         }
//       ]
//     });
//     if (train) {
//       const seatPurchased = await Transaction.findAll({
//         raw: true,
//         where: { id_train: train.id_train, departure_date: departureDate }
//       });
//       let purchased_seat = 0;
//       for (i = 0; i <= seatPurchased.length - 1; i++) {
//         purchased_seat += seatPurchased[i].seats_order;
//       }
//       let available_seat = train.trainName.seat - purchased_seat;
//       if (available_seat === 0) {
//         res.status(200).send({ message: "no seats available" });
//       } else {
//         res
//           .status(200)
//           .send({ message: "train found", data: train, available_seat });
//       }
//     } else {
//       throw new err();
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(404).send({ message: "train not found" });
//   }
// };

exports.getAllTrain = async (req, res) => {
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

exports.getSpecificTrain = async (req, res) => {
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
    res.status(200).send({ message: "get train(s) success", data });
  } catch (err) {
    console.log(err);
  }
};
