"use strict";
module.exports = (sequelize, DataTypes) => {
  const passanger = sequelize.define(
    "passanger",
    {
      name: DataTypes.STRING,
      identity: DataTypes.STRING,
      id_transaction: DataTypes.STRING
    },
    {}
  );
  passanger.associate = function(models) {
    passanger.belongsTo(models.transaction, {
      foreignKey: "id_transaction",
      sourceKey: "transaction_code"
    });
  };
  return passanger;
};
