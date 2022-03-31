module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUID4,
      notNull: true,
      primaryKey: true,
    },
  });

  Order.associate = (models) => {
    Order.belongsToMany(models.Book, { through: "OrderItem" });
    Order.belongsTo(models.User);
    Order.belongsTo(models.Address);
  };

  return Order;
};
