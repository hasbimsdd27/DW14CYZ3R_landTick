"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "transactions",
      [
        {
          id_user: 2,
          id_train: 1,
          origin: 1,
          destination: 2,
          seats_order: 3,
          route_id: 1,
          transaction_code: "DO-Line-" + "aabbccddeeffgg1234",
          departure_date: "2020-03-03",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("transactions", null, {});
  }
};
