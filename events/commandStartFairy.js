const Players = require("../models/players");
const CreatingPlayers = require("../models/creatingPlayers");

const fs = require("fs");
/* globals bot */

/**
 * Can be regular expression or String
 * @type {RegExp}
 */
module.exports.when = "Fairy";

/**
 * What to do when the pattern fires ?
 * @param ctx
 */
module.exports.do = async (ctx) => {
  await Players.sync();
  var chatId = ctx.from.id;
  var players = await Players.findAll({
    where: {
      telegram_id: chatId,
    },
  });
  console.log(players);
  if (players.length == 0) {
    await ctx.replyWithPhoto({
      source: fs.createReadStream(
        "/home/freddy/Escritorio/repos/hdg-escalable/assets/fairys/fairy.jpg"
      ),
    });
    ctx.reply(
      "Magical creatures that have used their powers for both good and evil, their power is fully unleashed when they fight as a team. Touch here if you're a fairy /iam_a_fairy "
    );
  }
};
