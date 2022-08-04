const Players = require("../models/players");
const Items = require("../models/items");
const { Op } = require("sequelize");
const others = require("../others/others");

module.exports = async (ctx) => {
  var chatId = ctx.update.message.chat.id;
  var players = await Players.findAll({
    attributes: ["inv_string"],
    where: {
      telegram_id: chatId,
    },
  });

  inv_string = players[0].dataValues.inv_string;

  itemsAndQuantity = others.decifrarInvString(inv_string);
  var items = await Items.findAll({
    where: {
      id: { [Op.or]: itemsAndQuantity.items },
    },
  });

  var s = `<b>Your inventory:</b>
    `;

  if (itemsAndQuantity.items.length == 0) s = "Your inventory is empty";
  for (let i = 0; i < itemsAndQuantity.items.length; i++) {
    for (let j = 0; j < items.length; j++) {
      if (itemsAndQuantity.items[i] == items[j].dataValues.id) {
        s += items[j].dataValues.name.toString();
        s += ": ";
        s += itemsAndQuantity.quantity[i].toString();
        s += ` <i>--Use:</i> /i`;
        s += items[j].dataValues.id.toString();
        s += `
    `;
      }
    }
  }
  s += ``;
  ctx.replyWithHTML(s);
};
