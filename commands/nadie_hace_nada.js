const Players = require("../models/players");
const others = require("../others/others");

module.exports = (ctx) => {
  Players.update({ is_in_quest: false }, { where: { is_in_quest: true } });
};
