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
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bookImage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "books",
    }
  );
  Book.beforeCreate(async (book, options) => {
    const category = await sequelize.models.BookCategory.findOne({
      where: { id: book.BookCategoryId },
    });
    if (category) {
      book.category = category.name;
    }
  });
  Book.associate = (models) => {
    Book.belongsToMany(models.Cart, {
      through: "CartItem",
      onDelete: "cascade",
    });
    Book.belongsToMany(models.Cart, {
      through: "OrderItem",
      onDelete: "cascade",
    });
    Book.belongsTo(models.BookCategory);
  };

  return Book;
};
