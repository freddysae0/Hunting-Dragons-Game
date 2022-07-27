const Players = require("../models/players");

module.exports = async (ctx) => {
  await Players.sync();

  var chatId = ctx.update.message.chat.id;
  try {
    await Players.drop({ where: { telegram_id: chatId } });
    ctx.reply(
      "Tu player fue borrado existosamente de la base de datos. Preciona /start para crear otro"
    );
  } catch (error) {
    console.log("/deleteMyPlayer tuvo un error");
    console.log(error);
  }
};
