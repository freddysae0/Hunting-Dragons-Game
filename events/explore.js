const Players = require("../models/players");
const others = require("../others/others");
const Items = require("../models/items");
/* globals bot */

/**
 * Can be regular expression or String
 * @type {RegExp}
 */
module.exports.when = "Explore";

/**
 * What to do when the pattern fires ?
 * @param ctx
 */
module.exports.do = async (ctx) => {
  await Players.sync();
  await Items.sync();
  var chatId = ctx.update.message.chat.id;
  var players = await Players.findAll({
    where: {
      telegram_id: chatId,
    },
  });

  if (players.length > 0) {
    ctx.reply(
      "Estas a punto de salir a explorar el reino en busca de nuevas aventuras Touch here to continue"
    );
  }
};
