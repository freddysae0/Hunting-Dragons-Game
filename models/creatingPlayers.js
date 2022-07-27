const { DataTypes, Model } = require("sequelize");
const { con } = require("../config/connect");

class creatingPlayers extends Model {}

creatingPlayers.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      autoIncrement: true,
      primaryKey: true,
    },
    telegram_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    kingdom_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    kingdom_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    role_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    race_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    race_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lvl: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    actual_exp: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    levelup_exp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    atk: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    def: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    mp: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dur: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    team_name: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    castle_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    castle_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    inv_string: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize: con, // We need to pass the connection instance
    modelName: "creatingPlayers", // We need to choose the model name
  }
);

module.exports = creatingPlayers;
