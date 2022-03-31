module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
    },
    { tableName: "carts" }
  );

  Cart.associate = (models) => {
    Cart.belongsTo(models.User);
    Cart.belongsToMany(models.Book, {
      through: "CartItem",
    });
  };

  return Cart;
};
