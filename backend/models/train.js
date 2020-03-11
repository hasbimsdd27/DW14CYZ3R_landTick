"use strict";
module.exports = (sequelize, DataTypes) => {
  const train = sequelize.define(
    "train",
    {
      name: DataTypes.STRING,
      seat: DataTypes.INTEGER,
      class: DataTypes.ENUM(
        "Executive",
        "Bussiness",
        "Economy",
        "Economy Premium",
        "Luxury",
        "Priority"
      )
    },
    {}
  );
  train.associate = function(models) {
    train.belongsToMany(models.user, {
      through: models.transaction,
      as: "user",
      foreignKey: "id_user"
    });
    train.hasMany(models.transaction, {
      as: "purchased_seat",
      foreignKey: "id_train"
    });
  };
  return train;
};
