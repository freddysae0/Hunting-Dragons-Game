const { DataTypes, Model } = require("sequelize");
const { con } = require("../config/connect");

class Players extends Model {}

Players.init(
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
      allowNull: false,
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
      allowNull: false,
    },
    race_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lvl: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    actual_exp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    levelup_exp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    inv_string: {
      type: DataTypes.STRING,
      allowNull: false,
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
    head: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    body: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    hands: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    legs: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    feet: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    principal_weapon: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    secondary_weapon: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    // Other model options go here
    sequelize: con, // We need to pass the connection instance
    modelName: "players", // We need to choose the model name
  }
);

module.exports = Players;
