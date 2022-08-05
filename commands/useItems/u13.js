const autoload = require("auto-load");
const others = require("../../others/others");
const Players = require("../../models/players");
const items = autoload("./others/items");
module.exports = async (ctx) => {
  function compare(a, b) {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  }

  await Players.sync();
  var chatId = ctx.update.message.chat.id;
  var players = await Players.findAll({
    where: {
      telegram_id: chatId,
    },
  });

  if (players.length > 0) {
    (id = players[0].dataValues.id),
      (telegram_id = players[0].dataValues.telegram_id),
      (kingdom_id = players[0].dataValues.kingdom_id),
      (kingdom_name = players[0].dataValues.kingdom_name),
      (name = players[0].dataValues.name),
      (role_id = players[0].dataValues.role_id),
      (role_name = players[0].dataValues.role_name),
      (race_id = players[0].dataValues.race_id),
      (race_name = players[0].dataValues.race_name),
      (lvl = players[0].dataValues.lvl),
      (actual_exp = players[0].dataValues.actual_exp),
      (levelup_exp = players[0].dataValues.levelup_exp),
      (atk = players[0].dataValues.atk),
      (def = players[0].dataValues.def),
      (mp = players[0].dataValues.mp),
      (dur = players[0].dataValues.dur),
      (team_id = players[0].dataValues.team_id),
      (team_name = players[0].dataValues.team_name),
      (castle_id = players[0].dataValues.castle_id),
      (castle_name = players[0].dataValues.castle_name),
      (inv_string = players[0].dataValues.inv_string),
      (head = players[0].dataValues.head),
      (body = players[0].dataValues.body),
      (hands = players[0].dataValues.hands),
      (legs = players[0].dataValues.legs),
      (feet = players[0].dataValues.feet),
      (principal_weapon = players[0].dataValues.principal_weapon),
      (secondary_weapon = players[0].dataValues.secondary_weapon),
      console.log("name", name);
    console.log("race", race_name);
    console.log("principal weapon", principal_weapon);

    arr_items = Object.values(items);
    arr_items.sort(compare);
    console.log(arr_items[12]);
  }
};
