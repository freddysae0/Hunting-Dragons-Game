/* fires when we receive a sticker */
module.exports.when = "sticker";

/* What to do when the bot gets a sticker */
module.exports.do = async (ctx) => {
  console.log(ctx.update.message.sticker);
  console.log("file_id", ctx.update.message.sticker.file_id);

  ctx.telegram.sendSticker(
    ctx.from.id,
    "CAACAgEAAxkBAAIZL2L2mm34mIA1A7NndtMGW6YeXAVdAALhAgACPU7RRmxLiAsLApUPKQQ"
  );
};
