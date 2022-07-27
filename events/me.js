const Players = require("../models/players");

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
  console.log(players);
  if (players.length > 0) {
    players = players[0];
    var s = `Hi ${players.dataValues.name}. You are in (Insertar Nombre) Kingdom\u{1F3F0}. Be Welcome  

    Role: ${players.dataValues.role_name}
    Race: ${players.dataValues.race_name}
    Lvl: ${players.dataValues.lvl}
    Exp: ${players.dataValues.actual_exp}/${players.dataValues.levelup_exp}
    Atk: ${players.dataValues.atk}  Def: ${players.dataValues.def}
    Mp: ${players.dataValues.mp}  Durabilty: ${players.dataValues.dur}
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
