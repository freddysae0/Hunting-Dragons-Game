/* globals bot */

/* when we receive the action delete, we just delete the message */
module.exports.when = "Explore";

/**
 * deletes the current message.
 * @param deleteMessage
 */

module.exports.do = async (ctx) => {
  await ctx.reply(
    "Decides adentrarte en el reino a explorar sus mas recognitos rincones. Volveras en 10s"
  );
  setTimeout(() => {
    ctx.reply("Volviste!! No recibiste nada, mmm");
  }, 10000);
};
