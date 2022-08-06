const autoload = require("auto-load");
const Players = require("../models/players");
const items = autoload("./others/items");

/* globals bot */

/**
 * Can be regular expression or String
 * @type {RegExp}
 */
module.exports.when = "Me";

/**
 * What to do when the pattern fires ?
 * @param ctx
 */
module.exports.do = async (ctx) => {
  await Players.sync();
  var chatId = ctx.update.message.chat.id;
  var players = await Players.findAll({
    where: {
      telegram_id: chatId,
    },
  });
  function compare(a, b) {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  }

  arr_items = Object.values(items);
  arr_items.sort(compare);

  console.log("arr_items", arr_items);
  console.log("principal_weapon", players[0].dataValues.principal_weapon);
  if (players.length > 0) {
    players = players[0];
    var s = `Hi ${players.dataValues.name}. You are in (Insertar Nombre) Kingdom\u{1F3F0}. Be Welcome  

    Race: ${players.dataValues.race_name}
    Lvl: ${players.dataValues.lvl}
    Exp: ${players.dataValues.actual_exp}/${players.dataValues.levelup_exp}
    Atk: ${players.dataValues.atk}  Def: ${players.dataValues.def}
    `;
    if (players.dataValues.mp) s += `Mp: ${players.dataValues.mp}  `;
    s += `Durabilty: ${players.dataValues.dur}
    `;
    if (players.dataValues.principal_weapon)
      s += `P Weapon: ${
        arr_items[players.dataValues.principal_weapon - 1].name
      } /un${arr_items[players.dataValues.principal_weapon - 1].id}
      `;

    if (players.dataValues.team_name)
      s += `Team: ${players.dataValues.team_name}
    `;
    if (players.dataValues.castle_name)
      s += `Castle: ${players.dataValues.castle_name}`;
    s += `
Press /inv to open the inventary `;
    ctx.reply(s);
  } else {
    console.log(
      `El usuario con id:${chatId} no esta logueado e intenta acceder al comando /me`
    );
  }
};
