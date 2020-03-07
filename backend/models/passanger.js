"use strict";
module.exports = (sequelize, DataTypes) => {
  const passanger = sequelize.define(
    "passanger",
    {
      name: DataTypes.STRING,
      identity: DataTypes.STRING,
      id_transaction: DataTypes.INTEGER
    },
    {}
  );
  passanger.associate = function(models) {
    passanger.belongsTo(models.transaction, {
      foreignKey: "id_transaction",
      sourceKey: "id"
    });
  };
  return passanger;
};
