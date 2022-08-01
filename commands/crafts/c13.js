const Players = require("../../models/players");
const others = require("../../others");

function isCrafteable(itemName, crafted_with_string) {
  return true;
}

module.exports = async (ctx) => {
  var chatId = ctx.update.message.chat.id;
  var player = await Players.findOne({
    where: {
      telegram_id: chatId,
    },
  });
  console.log();
  itemsAndQuantity = others.decifrarInvString(player.dataValues.inv_string);

  if (player === null) {
    console.log("El usuario esta accediendo a /i1 sin estar registrado");
  } else {
    if (isCrafteable("Wood Sword", (crafted_with_string = "/5/.3."))) {
      new_inv_string = others.addInvStringItem(
        player.dataValues.inv_string,
        13,
        1
      );
      console.log(
        (new_inv_string = others.deleteInvStringItem(new_inv_string, 5, 3))
      );
      await Players.update(
        { inv_string: new_inv_string },
        { where: { telegram_id: chatId } }
      );
      ctx.reply("Item Created");
    }
  }
  //var items = await Items.findAll();
};
