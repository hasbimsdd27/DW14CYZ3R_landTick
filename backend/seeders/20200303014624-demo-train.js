"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "trains",
      [
        {
          name: "ARGO BROMO ANGGREK",
          seat: 720,
          class: "Executive",

          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("trains", null, {});
  }
};
