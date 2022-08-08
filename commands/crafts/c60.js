const Players = require("../../models/players");
const others = require("../../others/others");

Item = others.getItembyId(others.getIdForThisFile(__filename));
const id = Item.id;

module.exports = async (ctx) => {
  var chatId = ctx.update.message.chat.id;
  var player = await Players.findOne({
    where: {
      telegram_id: chatId,
    },
  });
  itemsAndQuantity = others.decifrarInvString(player.dataValues.inv_string);

  if (player === null) {
    console.log(
      "El usuario esta accediendo a /" + command + " sin estar registrado"
    );
  } else {
    if (others.canBeCrafted(id, player.dataValues.inv_string)) {
      new_inv_string = others.addInvStringItem(
        player.dataValues.inv_string,
        item,
        crafting_return
      );

      new_inv_string = others.deleteInvStringItem(new_inv_string, 5, 3);
      await Players.update(
        { inv_string: new_inv_string },
        { where: { telegram_id: chatId } }
      );
      ctx.reply("Item Created. See your /inv");
    }
  }
  //var items = await Items.findAll();
};
