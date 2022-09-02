const Players = require("../models/players");
const CreatingPlayers = require("../models/creatingPlayers");
const Items = require("../models/items");
const InitialStatsByClass = require("../models/initialStatsByClases");
const others = require("../others/others");

module.exports = (ctx) => {
  Players.sync({ drop: true });
  CreatingPlayers.sync({ drop: true });
  Items.sync({ drop: true });
  InitialStatsByClass.sync({ drop: true });
};
