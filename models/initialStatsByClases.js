const { FLOAT } = require("sequelize");
const { DataTypes, Model } = require("sequelize");
const { con } = require("../config/connect");

class InitialStatsByClases extends Model {}

InitialStatsByClases.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      autoIncrement: true,
      primaryKey: true,
    },

    role_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    atk: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    def: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    mp: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    dur: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize: con, // We need to pass the connection instance
    modelName: "initialStatsByClases", // We need to choose the model name
  }
);

module.exports = InitialStatsByClases;
