const Players = require("../models/players");
const fs = require("fs");
/* globals bot */

/**
 * Can be regular expression or String
 * @type {RegExp}
 */
module.exports.when = "Vampire";

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
        "/home/freddy/Escritorio/repos/hdg-escalable/assets/vampires/vampire.jpg"
      ),
    });
    ctx.reply(
      "No one knows how or when they came into the world. They have been here forever. They regenerate in combat, and some of their abilities can cause irreparable damage to their enemies. That is why they are feared by all the other races. Touch here if you're a vampire /iam_a_vampire "
    );
  }
};
