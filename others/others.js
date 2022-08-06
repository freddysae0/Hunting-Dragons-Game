const autoload = require("auto-load");
const Players = require("../models/players");

function decifrarInvString(items_string) {
  if (typeof items_string != "string") return;
  var items = items_string.split("/");
  var quantity = items_string.split(".");
  var c = 0;
  var itemsnew = [];
  for (let i = 1; i < items.length; i += 2) {
    itemsnew[c] = items[i];
    c++;
  }

  c = 0;
  var quantitynew = [];
  for (let i = 1; i < quantity.length; i += 2) {
    quantitynew[c] = quantity[i];
    c++;
  }

  quantity = quantitynew;
  items = itemsnew;

  return { items, quantity };
}
function createInvString(items_array = [], quantity_array = []) {
  let inv_string = "";

  for (let i = 0; i < items_array.length; i++) {
    if (quantity_array[i]) {
      inv_string += "/";
      inv_string += items_array[i].toString();
      inv_string += "/.";
      inv_string += quantity_array[i].toString();
      inv_string += ".";
    }
  }
  return inv_string;
}

function deleteInvStringItem(items_string, item_id, quantity_to_delete) {
  if (typeof items_string != "string") return;
  var items = items_string.split("/");
  var quantity = items_string.split(".");
  var c = 0;
  var itemsnew = [];
  for (let i = 1; i < items.length; i += 2) {
    itemsnew[c] = items[i];
    c++;
  }

  c = 0;
  var quantitynew = [];
  for (let i = 1; i < quantity.length; i += 2) {
    quantitynew[c] = quantity[i];
    c++;
  }

  quantity = quantitynew;
  items = itemsnew;

  for (let i = 0; i < items.length; i++) {
    if (items[i] == item_id) {
      quantity[i] -= quantity_to_delete;
      break;
    }
  }
  return createInvString(items, quantity);
}

function addInvStringItem(items_string, item_id, quantity_to_add) {
  if (typeof items_string != "string") return;
  var items = items_string.split("/");
  var quantity = items_string.split(".");
  var c = 0;
  var itemsnew = [];
  for (let i = 1; i < items.length; i += 2) {
    itemsnew[c] = items[i];
    c++;
  }

  c = 0;
  let quantitynew = [];
  for (let i = 1; i < quantity.length; i += 2) {
    quantitynew[c] = parseInt(quantity[i]);
    c++;
  }

  quantity = quantitynew;
  items = itemsnew;
  console.log(items);
  console.log(quantity);
  exists = false;
  for (let i = 0; i < items.length; i++) {
    if (items[i] == item_id) {
      exists = true;
      quantity[i] += parseInt(quantity_to_add);
      break;
    }
  }
  if (exists == false) {
    items.push(item_id);
    quantity.push(quantity_to_add);
  }
  return createInvString(items, quantity);
}

function canBeCrafted(item_name, item_string, cntItems) {
  var ans = 10000000;
  var itemsRequired = decifrarInvString(item_string);
  console.log(itemsRequired);
  for (var i = 0; i < itemsRequired.items.length; i++) {
    ans = Math.min(
      ans,
      parseInt(cntItems[itemsRequired.items[i]] / itemsRequired.quantity[i])
    );
  }

  return ans;
}

async function unequip_item(partOfBody, ctx) {
  chatId = ctx.from.id;
  console.log(chatId);
  player = await Players.findOne({ where: { telegram_id: chatId } });
  if (partOfBody == "head") {
  }
  if (partOfBody == "body") {
    if (partOfBody == "hands") {
    }
    if (partOfBody == "legs") {
    }
    if (partOfBody == "feet") {
    }
  }
  if (
    partOfBody == "principal_weapon" &&
    player.dataValues.principal_weapon == null
  ) {
    item = player.dataValues.principal_weapon;
    xd = weapons;
    console.log("item of principal_weapon", xd);
  }
  if (partOfBody == "secondary_weapon") {
  }
}

module.exports = {
  decifrarInvString,
  createInvString,
  deleteInvStringItem,
  addInvStringItem,
  canBeCrafted,
  unequip_item,
};
