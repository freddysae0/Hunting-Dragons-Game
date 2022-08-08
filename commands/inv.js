const Players = require("../models/players");
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
  itemsEnElInv = itemsAndQuantity.items;
  var tengoElItem = [];

  for (let i = 0; i < itemsEnElInv.length; i++) {
    tengoElItem[itemsEnElInv[i]] = itemsAndQuantity.quantity[i];
  }
  console.log(itemsEnElInv);
  console.log(tengoElItem);

  console.log(tengoElItem[itemsEnElInv[0]]);
  console.log(tengoElItem[itemsEnElInv[1]]);
  console.log(tengoElItem[itemsEnElInv[2]]);

  Items = others.getItemsArray();

  var s = `<b>Your inventory:</b>
    `;

  if (itemsAndQuantity.items.length == 0) s = "Your inventory is empty";
  for (let i = 0; i < itemsEnElInv.length; i++) {
    thisItem = others.getItembyId(itemsEnElInv[i]);
    s += thisItem.name;
    s += ": ";
    s += tengoElItem[itemsEnElInv[i]].toString();
    s += ` <i>--Use:</i> /i`;
    s += thisItem.id.toString();
    s += `
    `;
  }
  s += ``;
  ctx.replyWithHTML(s);
};
