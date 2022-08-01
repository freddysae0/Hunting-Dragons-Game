const Players = require("../../models/players");
const others = require("../../others");

module.exports = async (ctx) => {
  var chatId = ctx.update.message.chat.id;
  var player = await Players.findOne({
    where: {
      telegram_id: chatId,
    },
  });
  var tieneElItem = false;
  itemsAndQuantity = others.decifrarInvString(player.dataValues.inv_string);
  for (let i = 0; i < itemsAndQuantity.items.length; i++) {
    if (itemsAndQuantity.items[i] == 13) tieneElItem = true;
  }

  if (player === null) {
    console.log("El usuario esta accediendo a /i1 sin estar registrado");
  } else if (tieneElItem == true) {
  }
  //var items = await Items.findAll();
};
