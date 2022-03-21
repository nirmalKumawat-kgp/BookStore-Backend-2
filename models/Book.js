module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    "Book",
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
        unique: true,
        // lowercase true
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        // lowercase true
      },
      originalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      discountPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      tableName: "books",
    }
  );
  Book.associate = (models) => {
    Book.belongsToMany(models.Cart, { through: "CartItem" });
    Book.belongsToMany(models.Cart, { through: "OrderItem" });
    Book.belongsTo(models.BookCategory);
  };
  return Book;
};
