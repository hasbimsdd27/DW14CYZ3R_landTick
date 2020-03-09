"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("routes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      origin: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      departure: {
        allowNull: false,
        type: Sequelize.TIME
      },
      destination: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      arrival: {
        allowNull: false,
        type: Sequelize.TIME
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      id_train: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("routes");
  }
};
