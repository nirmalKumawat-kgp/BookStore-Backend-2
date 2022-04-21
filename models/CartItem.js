module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define(
    "CartItem",
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,

        defaultValue: 1,
      },
    },
    {
      tableName: "cartitems",
    }
  );

  return CartItem;
};
