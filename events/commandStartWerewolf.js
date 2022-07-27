const Players = require("../models/players");
const fs = require("fs");
/* globals bot */

/**
 * Can be regular expression or String
 * @type {RegExp}
 */
module.exports.when = "Werewolf";

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
        "/home/freddy/Escritorio/repos/hdg-escalable/assets/werewolfs/werewolf.jpg"
      ),
    });
    ctx.reply(
      "The legend say that that race habits around all the wolrld, They are awesome warriors, But few are able to controle its power. If you're one of those go here /iam_a_werewolf"
    );
  }
};
