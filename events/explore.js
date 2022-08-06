const Players = require("../models/players");
const others = require("../others/others");
const Items = require("../models/items");
const Markup = require("telegraf/markup");
/* globals bot */

const ExploreAndMisions = [
  [Markup.callbackButton("Explore", "Explore")],
  [Markup.callbackButton("Misiones Disponibles!", "Misiones Disponibles!")],
];
const JustExplore = [[Markup.callbackButton("Explore", "Explore")]];
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
    //Este arreglo missions debe contener id de misiones
    missions = [];
    if (missions.length == 0) {
      ctx.reply(
        "Estas a punto de salir a explorar el reino en busca de nuevas aventuras Touch here to continue:",
        Markup.inlineKeyboard(JustExplore).extra()
      );
    }
    if (missions.length > 0) {
      ctx.reply(
        "Estas a punto de salir a explorar el reino en busca de nuevas aventuras Touch here to continue:",
        Markup.inlineKeyboard(ExploreAndMisions).extra()
      );
    }
  }
};
