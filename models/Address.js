module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    "Address",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUID4,
        primaryKey: true,
        notNull: true,
      },
      Street: {
        type: DataTypes.STRING,
        notNull: true,
      },
      LandMark: {
        type: DataTypes.STRING,
        notNull: true,
      },
      City: {
        type: DataTypes.STRING,
        notNull: true,
      },
      Pincode: {
        type: DataTypes.INTEGER,
        notNull: true,
      },
    },
    {
      tableName: "Addresses",
    }
  );
  Address.associate = (models) => {
    Address.belongsTo(models.User);
    Address.hasMany(models.Order);
  };
  return Address;
};
