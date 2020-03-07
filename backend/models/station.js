"use strict";
module.exports = (sequelize, DataTypes) => {
  const station = sequelize.define(
    "station",
    {
      name: DataTypes.STRING,
      code: DataTypes.STRING,
      wilayah: DataTypes.STRING
    },
    {}
  );
  station.associate = function(models) {};
  return station;
};
