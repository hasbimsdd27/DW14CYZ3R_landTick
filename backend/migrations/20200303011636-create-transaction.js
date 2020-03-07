"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("transactions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_user: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      id_train: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      route_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      image_name: {
        type: Sequelize.STRING
      },
      total: {
        type: Sequelize.INTEGER
      },
      transaction_code: {
        allowNull: false,
        type: Sequelize.STRING
      },
      seats_order: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      origin: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      destination: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      departure_date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM("Waiting Payment", "Paid", "Approved")
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
    return queryInterface.dropTable("transactions");
  }
};
