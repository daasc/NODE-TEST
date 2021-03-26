"use strict";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      hooks: {
        beforeCreate: (user, options) => {
          return bcrypt
            .hash(user.password, 10)
            .then((hash) => {
              user.password = hash;
            })
            .catch((error) => {
              throw new Error(error);
            });
        },
      },
      modelName: "User",
    }
  );
  User.prototype.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  User.prototype.generateToken = function () {
    return jwt.sign(
      {
        id: this.id,
        name: this.name,
        role: this.role,
      },
      "secret",
      { expiresIn: "3d" }
    );
  };

  return User;
};
