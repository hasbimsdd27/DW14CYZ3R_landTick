"use strict";
module.exports = (sequelize, DataTypes) => {
  const transaction = sequelize.define(
    "transaction",
    {
      id_user: DataTypes.INTEGER,
      id_train: DataTypes.INTEGER,
      origin: DataTypes.INTEGER,
      destination: DataTypes.INTEGER,
      route_id: DataTypes.INTEGER,
      image_name: DataTypes.STRING,
      transaction_code: DataTypes.STRING,
      total: DataTypes.INTEGER,
      seats_order: DataTypes.INTEGER,
      departure_date: DataTypes.DATEONLY,
      status: DataTypes.ENUM("Waiting Payment", "Paid", "Approved")
    },
    {}
  );
  transaction.associate = function(models) {
    transaction.belongsTo(models.user, {
      foreignKey: "id_user",
      sourceKey: "id",
      as: "user"
    });
    transaction.belongsTo(models.station, {
      foreignKey: "origin",
      sourceKey: "id",
      as: "originStation"
    });
    transaction.belongsTo(models.station, {
      foreignKey: "destination",
      sourceKey: "id",
      as: "destinationStation"
    });
    transaction.belongsTo(models.train, {
      foreignKey: "id_train",
      sourceKey: "id",
      as: "train"
    });
    transaction.belongsTo(models.route, {
      foreignKey: "route_id",
      sourceKey: "id",
      as: "route"
    });
    transaction.hasMany(models.passanger, {
      foreignKey: "transaction_code",
      as: "passanger"
    });
  };
  return transaction;
};
