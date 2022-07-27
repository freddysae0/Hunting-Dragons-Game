/* globals bot */

/**
 * This manager fires when the user types /help
 * @param ctx
 * @returns {*}
 */
module.exports = (ctx) => {
  console.log(`${ctx.from.id} calling for help`);
  return ctx.reply(
    "We thought that everything had already happened, but there are still creatures stalking our Kingdoms press /start to play.  MMORPG in Telegram"
  );
};
