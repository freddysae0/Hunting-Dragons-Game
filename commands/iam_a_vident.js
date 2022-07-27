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

  if (players.length == 0) {
    await CreatingPlayers.sync();
    var creatingPlayers = await CreatingPlayers.findAll({
      where: { telegram_id: chatId },
    });
    //race_name = creatingPlayers[0].dataValues.race_name;
    race_name = creatingPlayers[0].dataValues.race_name;

    if (race_name == "Human" || race_name == "Fairy") {
      await CreatingPlayers.update(
        {
          role_id: 4,
          role_name: "Vident",
        },
        {
          where: {
            telegram_id: chatId,
          },
        }
      );

      await ctx.telegram.sendMessage(
        ctx.from.id,

        "Now just tell me your name: ",
        {
          reply_markup: {
            resize_keyboard: true,
          },
        }
      );
    }
  }
};
