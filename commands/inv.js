const Players = require("../models/players");
const { Op } = require("sequelize");
const others = require("../others/others");

module.exports = async (ctx) => {
  function compare(a, b) {
    if (a > b) return 1;
    if (a < b) return -1;
    else return 0;
  }
  var chatId = ctx.update.message.chat.id;
  var players = await Players.findAll({
    attributes: ["inv_string", "inv_size"],
    where: {
      telegram_id: chatId,
    },
  });

  inv_string = players[0].dataValues.inv_string;

  itemsAndQuantity = others.decifrarInvString(inv_string);

  itemsEnElInv = itemsAndQuantity.items;

  var tengoElItem = [];
  var q = 0;
  for (let i = 0; i < itemsEnElInv.length; i++) {
    tengoElItem[itemsEnElInv[i]] = itemsAndQuantity.quantity[i];
    q += itemsAndQuantity.quantity[i];
  }
  itemsEnElInv.sort(compare);
  console.log(itemsEnElInv);
  Items = others.getItemsArray();
  var s = `<b>Your inventory: (${q}/${players[0].dataValues.inv_size})</b>
    `;

  if (itemsAndQuantity.items.length == 0) s = "Your inventory is empty";
  for (let i = 0; i < itemsEnElInv.length; i++) {
    thisItem = others.getItembyId(itemsEnElInv[i]);
    s += thisItem.name;
    s += ": ";
    s += tengoElItem[itemsEnElInv[i]].toString();
    s += ` <i> -Info:</i> /i`;
    s += thisItem.id.toString();
    s += `
    `;
  }
  s += ``;
  ctx.replyWithHTML(s);
};
