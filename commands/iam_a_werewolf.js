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

  const INITIAL_KEYBOARD = [[{ text: "Fighter" }], [{ text: "Protector" }]];

  if (players.length == 0) {
    await CreatingPlayers.sync();

    await CreatingPlayers.update(
      {
        race_id: 4,
        race_name: "Werewolf",
      },
      {
        where: {
          telegram_id: chatId,
        },
      }
    );

    const log = await CreatingPlayers.findAll();
    console.log(log);
    await ctx.telegram.sendMessage(
      ctx.from.id,

      "Oh. I'm glad to hear that. Werewolves are loyal and trustworthy creatures, not as many believe. They are strong and powerful. His abilities increase with the phases of the moon",
      {
        reply_markup: null,
      }
    );
    await ctx.telegram.sendMessage(ctx.from.id, "Now just tell me your name:");
  }
};
