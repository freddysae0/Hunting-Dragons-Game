/* globals bot */
const Players = require("../models/players");
const CreatingPlayers = require("../models/creatingPlayers");
const me = require("../events/me");
/**
 * This fires when the user does /start
 * @param ctx
 * @returns {*}
 */

module.exports = async (ctx) => {
  await Players.sync();
  var chatId = ctx.update.message.chat.id;
  var players = await Players.findAll({
    where: {
      telegram_id: chatId,
    },
  });
  console.log(players);
  if (players.length > 0) {
    me.do(ctx);
  } else {
    await CreatingPlayers.sync();
    var creatingPlayers = await CreatingPlayers.findAll({
      where: {
        telegram_id: chatId,
      },
    });

    if (creatingPlayers.length == 0) {
      await CreatingPlayers.create({
        telegram_id: chatId,
        inv_string: "",
        lvl: 1,
      });
      console.log("se creo una entrada en creatingPlayers");
    }

    const INITIAL_KEYBOARD = [
      [{ text: "Human" }, { text: "Werewolf" }],
      [{ text: "Vampire" }, { text: "Fairy" }],
    ];

    await ctx.telegram.sendMessage(
      ctx.from.id,
      "We thought that everything had already happened, but there are still creatures stalking our kingdoms. It's a placer to see you here ... Pick your race: ",
      {
        reply_markup: {
          keyboard: INITIAL_KEYBOARD,
          resize_keyboard: true,
        },
      }
    );

    console.log(`El usuario ${ctx.from.id} se esta registrando`);
    console.log(ctx.from.id);
  }
};
