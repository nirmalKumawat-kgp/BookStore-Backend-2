module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    "OrderItem",
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
      tableName: "orderitems",
    }
  );

  return OrderItem;
};
