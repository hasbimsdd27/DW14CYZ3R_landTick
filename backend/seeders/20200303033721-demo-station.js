"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "stations",
      [
        {
          code: "Jakarta (GMR)",
          name: "Gambir",
          wilayah: "Jakarta",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          code: "Surabaya (SBI)",
          name: "Surabaya Pasar Turi",
          wilayah: "Surabaya",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("stations", null, {});
  }
};
