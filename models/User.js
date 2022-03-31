const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Cart } = require("../models");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        // lowercase true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            msg: "Must be a valid email address",
          },
          notEmpty: true,
        },
        // lowercase true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          min: {
            args: [6],
            msg: "Minimum 6 characters required as password",
          },
        },
      },
      role: {
        type: DataTypes.ENUM,
        values: ["admin", "regular"],
        defaultValue: "regular",
      },
      // store
    },
    {
      tableName: "users",
    }
  );

  User.prototype.verifyPassword = async function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.prototype.getSignedToken = function () {
    const token = jwt.sign({ id: this.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.EXPIRES_IN,
    });
    return token;
  };
  //Hooks
  User.afterValidate(async (user, options) => {
    if (user.changed("password")) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  });

  User.afterCreate(async (user, options) => {
    const userId = user.id;
    let cart = await sequelize.models.Cart.create({ UserId: userId });
    await cart.save();
  });

  User.associate = (models) => {
    User.hasOne(models.Cart, { onDelete: "cascade" });
    User.hasMany(models.Order, { onDelete: "cascade" });
    User.hasMany(models.Address, { onDelete: "cascade" });
  };

  return User;
};
