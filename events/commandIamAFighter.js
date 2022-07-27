const Players = require("../models/players");
const CreatingPlayers = require("../models/creatingPlayers");

const fs = require("fs");
/* globals bot */

/**
 * Can be regular expression or String
 * @type {RegExp}
 */
module.exports.when = "Fighter";

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
    await CreatingPlayers.sync();
    var creatingPlayers = await CreatingPlayers.findAll({
      where: {
        telegram_id: chatId,
      },
    });
    race_name = creatingPlayers[0].dataValues.race_name;

    if (race_name == "Fairy") {
      await ctx.replyWithPhoto({
        source: fs.createReadStream(
          "/home/freddy/Escritorio/repos/hdg-escalable/assets/fairys/fighter.jpg"
        ),
      });
      ctx.reply(
        "Principally habilities in ranged combat, use magic for make damage and enchant weapons. Touch here to be a fighter /iam_a_fighter "
      );
    }
    if (race_name == "Human") {
      await ctx.replyWithPhoto({
        source: fs.createReadStream(
          "/home/freddy/Escritorio/repos/hdg-escalable/assets/humans/fighter.jpg"
        ),
      });
      ctx.reply(
        "Principally habilities in mele combat, usually use big weapons for make damage. Touch here to be a fighter /iam_a_fighter "
      );
    }
    if (race_name == "Werewolf") {
      await ctx.replyWithPhoto({
        source: fs.createReadStream(
          "/home/freddy/Escritorio/repos/hdg-escalable/assets/werewolfs/fighter.jpg"
        ),
      });
      ctx.reply(
        "Principally habilities in mele combat, use the moon power for make damage and chaos. Touch here to be a fighter /iam_a_fighter "
      );
    }
  }
};
