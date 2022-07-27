const Players = require("../models/players");
const CreatingPlayers = require("../models/creatingPlayers");

module.exports = async (ctx) => {
  await Players.sync();
  var chatId = ctx.update.message.chat.id;
  var players = await Players.findAll({
    where: {
      telegram_id: chatId,
    },
  });

  const INITIAL_KEYBOARD = [
    [{ text: "Fighter" }],
    [{ text: "Healer" }],
    [{ text: "Vident" }],
  ];

  if (players.length == 0) {
    await CreatingPlayers.sync();

    await CreatingPlayers.update(
      {
        race_id: 3,
        race_name: "Fairy",
      },
      {
        where: {
          telegram_id: chatId,
        },
      }
    );

    await ctx.telegram.sendMessage(
      ctx.from.id,

      "Ohh, I haven't seen a fairy around here for a long time. Fairies can use their power to both heal and harm. In addition, their magic allows them to know where some creatures are ... Pick your class: ",
      {
        reply_markup: {
          keyboard: INITIAL_KEYBOARD,
          resize_keyboard: true,
        },
      }
    );
  }
};
