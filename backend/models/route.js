"use strict";
module.exports = (sequelize, DataTypes) => {
  const route = sequelize.define(
    "route",
    {
      origin: DataTypes.INTEGER,
      departure: DataTypes.TIME,
      destination: DataTypes.INTEGER,
      arrival: DataTypes.TIME,
      price: DataTypes.INTEGER,
      id_train: DataTypes.INTEGER
    },
    {}
  );
  route.associate = function(models) {
    route.belongsTo(models.train, {
      foreignKey: "id_train",
      sourceKey: "id",
      as: "trainName"
    });
    route.belongsTo(models.station, {
      foreignKey: "origin",
      sourceKey: "id",
      as: "originStation"
    });
    route.belongsTo(models.station, {
      foreignKey: "destination",
      sourceKey: "id",
      as: "destinationStation"
    });
  };
  return route;
};
