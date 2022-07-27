const { DataTypes, Model } = require("sequelize");
const { con } = require("../config/connect");

class Items extends Model {}

Items.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING(10000),

      allowNull: true,
    },
    class_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    class_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tier_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tier_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    // Other model options go here
    sequelize: con, // We need to pass the connection instance
    modelName: "items", // We need to choose the model name
  }
);

module.exports = Items;
