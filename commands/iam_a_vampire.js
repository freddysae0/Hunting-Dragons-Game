const CreatingPlayers = require("../models/creatingPlayers");
const Players = require("../models/players");

module.exports = async (ctx) => {
  await Players.sync();
  var chatId = ctx.update.message.chat.id;
  var players = await Players.findAll({
    where: {
      telegram_id: chatId,
    },
  });

  const INITIAL_KEYBOARD = [[{ text: "Lifestealer" }], [{ text: "Protector" }]];

  if (players.length == 0) {
    await CreatingPlayers.sync();

    await CreatingPlayers.update(
      {
        race_id: 2,
        race_name: "Vampire",
      },
      {
        where: {
          telegram_id: chatId,
        },
      }
    );

    await ctx.telegram.sendMessage(
      ctx.from.id,

      "Oh. No one knows how this race came to be, but we believe that a long time ago a vampire who protected the kingdom was overturned by dark forces making him dependent on blood. Currently some vampires do not draw their strength from the blood of others and have strong defensive qualities. But those who do it increases their aggressiveness and strength. ... Pick your class: ",
      {
        reply_markup: {
          keyboard: INITIAL_KEYBOARD,
          resize_keyboard: true,
        },
      }
    );
  }
};
