var path = require("path");

const autoload = require("auto-load");
const others = require("../../others/others");
const Players = require("../../models/players");
const items = autoload("./others/items");
var idString = "";
file_name = path.basename(__filename);
for (let i = 1; i < file_name.length - 3; i++) {
  idString += file_name[i];
}
const idNumber = parseInt(idString);

module.exports = async (ctx) => {
  function compare(a, b) {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  }

  await Players.sync();
  var chatId = ctx.update.message.chat.id;
  var players = await Players.findAll({
    where: {
      telegram_id: chatId,
    },
  });

  if (players.length > 0) {
    var name = players[0].dataValues.name;
    var race_name = players[0].dataValues.race_name;
    var atk = players[0].dataValues.atk;
    var def = players[0].dataValues.def;
    var mp = players[0].dataValues.mp;
    var inv_string = players[0].dataValues.inv_string;
    var secondary_weapon = players[0].dataValues.secondary_weapon;
    var two_hands_weapon = players[0].dataValues.two_hands_weapon;
    console.log("name", name);
    console.log("race", race_name);
    console.log("secondary weapon", secondary_weapon);

    arr_items = Object.values(items);
    arr_items.sort(compare);
    item = others.getItembyId(idNumber);
    var tieneElItem = false;
    itemsAndQuantity = others.decifrarInvString(inv_string);
    for (let i = 0; i < itemsAndQuantity.items.length; i++) {
      if (itemsAndQuantity.items[i] == idNumber) tieneElItem = true;
    }

    if (tieneElItem) {
      if (secondary_weapon != null) {
        secondaryWeapon = others.getItembyId(secondary_weapon);
        atk -= secondaryWeapon.atk;
        def -= secondaryWeapon.def;
        mp -= secondaryWeapon.mp;
        inv_string = others.addInvStringItem(inv_string, secondary_weapon, 1);
        secondary_weapon = null;
        await Players.update(
          { inv_string, secondary_weapon, atk, def, mp },
          { where: { telegram_id: chatId } }
        );
      }

      if (two_hands_weapon != null) {
        secondaryWeapon = others.getItembyId(two_hands_weapon);
        atk -= secondaryWeapon.atk;
        def -= secondaryWeapon.def;
        mp -= secondaryWeapon.mp;
        inv_string = others.addInvStringItem(inv_string, two_hands_weapon, 1);
        two_hands_weapon = null;
        await Players.update(
          { inv_string, two_hands_weapon, atk, def, mp },
          { where: { telegram_id: chatId } }
        );
      }
      if (secondary_weapon == null) {
        def = def + item.def;
        atk = atk + item.atk;
        mp = mp + item.mp;
        await Players.update(
          { def, atk, mp },
          { where: { telegram_id: chatId } }
        );

        secondary_weapon = idNumber;
        inv_string = others.deleteInvStringItem(inv_string, idNumber, 1);
        await Players.update(
          { inv_string, secondary_weapon },
          { where: { telegram_id: chatId } }
        );

        ctx.reply("Item equiped");
      }
    } else {
      ctx.reply("You don't have that item");
    }
  }
};
