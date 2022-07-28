const Players = require("../models/players");
const fs = require("fs");
/* globals bot */

/**
 * Can be regular expression or String
 * @type {RegExp}
 */
module.exports.when = "Human";

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
  if (players.length == 0) {
    await ctx.replyWithPhoto({
      source: fs.createReadStream("assets/humans/human.jpg"),
    });
    ctx.reply(
      "Years ago, humans came to our kingdom since theirs had been invaded by dragons. Some say they still hear them and dream of them. Though no one cares anyway. Touch here if you're a human /iam_a_human "
    );
  }
};
