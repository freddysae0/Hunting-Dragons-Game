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

  const INITIAL_KEYBOARD = [
    [{ text: "Fighter" }, { text: "Protector" }],
    [{ text: "Healer" }],
    [{ text: "Vident" }],
  ];

  if (players.length == 0) {
    await CreatingPlayers.sync();

    await CreatingPlayers.update(
      {
        race_id: 1,
        race_name: "Human",
      },
      {
        where: {
          telegram_id: chatId,
        },
      }
    );

    await ctx.telegram.sendMessage(
      ctx.from.id,

      "The last human I saw was an ambitious being with a heart clouded by his ego. He wanted to tame the dragons. How stupid don't you think? Humans can protect others, they are good warriors and by fleeing to it some have developed magical abilities ... Pick your class: ",
      {
        reply_markup: {
          keyboard: INITIAL_KEYBOARD,
          resize_keyboard: true,
        },
      }
    );
  }
};
