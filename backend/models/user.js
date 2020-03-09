"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      level: DataTypes.ENUM("user", "admin"),
      gender: DataTypes.ENUM("male", "female"),
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      identity: DataTypes.STRING
    },
    {}
  );
  user.associate = function(models) {
    user.belongsToMany(models.train, {
      through: models.transaction,
      as: "train",
      foreignKey: "id_user"
    });
  };
  return user;
};

// gender: {
//   allowNull: false,
//   type: Sequelize.ENUM("male", "female")
// },
// phone: {
//   allowNull: false,
//   type: Sequelize.STRING
// },
// address: {
//   allowNull: false,
//   type: Sequelize.STRING
// },
