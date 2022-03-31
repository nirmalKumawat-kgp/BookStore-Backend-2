module.exports = (sequelize, DataTypes) => {
  const BookCategory = sequelize.define("BookCategory", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      notNull: true,
    },
  });

  BookCategory.associate = (models) => {
    BookCategory.hasMany(models.Book);
  };

  return BookCategory;
};
