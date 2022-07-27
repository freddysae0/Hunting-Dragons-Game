const Players = require("../models/players");
const CreatingPlayers = require("../models/creatingPlayers");
const fs = require("fs");
/* globals bot */

/**
 * Can be regular expression or String
 * @type {RegExp}
 */
module.exports.when = "Vident";

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

    if (race_name == "Human") {
      await ctx.replyWithPhoto({
        source: fs.createReadStream(
          "/home/freddy/Escritorio/repos/hdg-escalable/assets/humans/vident.jpg"
        ),
      });
      ctx.reply(
        "They started out as just dreams. It seemed somewhat normal due to the recent trauma. But it was not normal to repeat the same dream for weeks, months and for it to come true. These humans develop well fighting, predicting the blows of the enemy, and looking for treasures that nobody sees since when they entered the magical kingdom they obtained powers, which even today they continue to discover ... Touch here to be a healer /iam_a_vident "
      );
    }

    if (race_name == "Fairy") {
      await ctx.replyWithPhoto({
        source: fs.createReadStream(
          "/home/freddy/Escritorio/repos/hdg-escalable/assets/fairys/vident.jpg"
        ),
      });
      ctx.reply(
        "Aqui deberia ir una descripcion de las hadas videntes( algunas ideas pueden ser: Que tipo de magia usan, porque tienen la habilidad de ser videntes). Touch here to be a vident /iam_a_vident "
      );
    }
  }
};
