const Players = require("../models/players");
const others = require("../others");
/* globals bot */

/**
 * Can be regular expression or String
 * @type {RegExp}
 */
module.exports.when = "Craft";

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
    var string_id = players[0].dataValues.inv_string;

    var xd = others.decifrarInvString(string_id);

    console.log(xd);
  } else {
  }
};
