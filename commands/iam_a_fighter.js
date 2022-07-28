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

  const INITIAL_KEYBOARD = [];

  if (players.length == 0 && players[0].dataValues.lvl >= 10) {
    race_name = players[0].dataValues.race_name;

    if (
      race_name == "Human" ||
      race_name == "Fairy" ||
      race_name == "Werewolf"
    ) {
      await Players.update(
        {
          role_id: 5,
          role_name: "Fighter",
        },
        {
          where: {
            telegram_id: chatId,
          },
        }
      );

      await ctx.telegram.sendMessage(
        ctx.from.id,

        `Felicidades, te haz adaptado a este mundo y haz decidido desarrollar tus habilidades de luchador. Obtienes  
        +3 de atk,  +1 de def `
      );
    }
  }
};
