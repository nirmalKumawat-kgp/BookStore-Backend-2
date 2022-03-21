module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define(
    "CartItem",
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        defaultValue: 0,
      },
    },
    {
      tableName: "cartitems",
    }
  );

  return CartItem;
};
