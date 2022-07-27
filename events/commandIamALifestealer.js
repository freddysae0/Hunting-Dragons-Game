const Players = require("../models/players");
const CreatingPlayers = require("../models/creatingPlayers");
const fs = require("fs");
/* globals bot */

/**
 * Can be regular expression or String
 * @type {RegExp}
 */
module.exports.when = "Lifestealer";

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
    var creatingPlayers = await CreatingPlayers.findAll({
      attributes: ["race_name"],
      where: {
        telegram_id: chatId,
      },
    });
    console.log((race_name = creatingPlayers[0].dataValues.race_name));

    if (race_name == "Vampire") {
      await ctx.replyWithPhoto({
        source: fs.createReadStream(
          "/home/freddy/Escritorio/repos/hdg-escalable/assets/vampires/lifestealer.jpeg"
        ),
      });
      ctx.reply(
        "Aqui iria una descripcion del vampiro lifestealer ... Touch here to be a healer /iam_a_lifestealer "
      );
    }
  }
};
