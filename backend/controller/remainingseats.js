const models = require("../models");
const Station = models.station;
const Train = models.train;
const User = models.user;
const Route = models.route;
const Transaction = models.transaction;
const Passanger = models.passanger;
const Sequelize = require("sequelize");

exports.RemainingSeats = async (req, res) => {
  try {
    const { departureDate } = req.params;
    // const train = await Train.findOne({ raw: true, where: { id: id_train } });
    // if (train) {
    //   const seatPurchased = await Transaction.findAll({
    //     raw: true,
    //     where: { id_train, departure_date: departureDate }
    //   });
    //   let purchased_seat = 0;
    //   for (i = 0; i <= seatPurchased.length - 1; i++) {
    //     purchased_seat += seatPurchased[i].seats_order;
    //   }

    //   let available_seat = train.seat - purchased_seat;
    //   if (available_seat === 0) {
    //     res.status(200).send({ message: "no seats available" });
    //   } else {
    //     res
    //       .status(200)
    //       .send({ message: "train found", data: train, available_seat });
    //   }

    const purchasedSeat = await Transaction.findAll({
      where: { departure_date: departureDate },
      attributes: [
        "id_train",
        [Sequelize.fn("sum", Sequelize.col("seats_order")), "total_seat"]
      ],
      group: ["id_train"]
    });

    res.send(purchasedSeat);
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: "train not found" });
  }
};
