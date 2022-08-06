const autoload = require("auto-load");
const others = require("../../others/others");
const Players = require("../../models/players");
const items = autoload("./others/items");
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
    var id = players[0].dataValues.id;
    var telegram_id = players[0].dataValues.telegram_id;
    var kingdom_id = players[0].dataValues.kingdom_id;
    var kingdom_name = players[0].dataValues.kingdom_name;
    var name = players[0].dataValues.name;
    var role_id = players[0].dataValues.role_id;
    var role_name = players[0].dataValues.role_name;
    var race_id = players[0].dataValues.race_id;
    var race_name = players[0].dataValues.race_name;
    var lvl = players[0].dataValues.lvl;
    var actual_exp = players[0].dataValues.actual_exp;
    var levelup_exp = players[0].dataValues.levelup_exp;
    var atk = players[0].dataValues.atk;
    var def = players[0].dataValues.def;
    var mp = players[0].dataValues.mp;
    var dur = players[0].dataValues.dur;
    var team_id = players[0].dataValues.team_id;
    var team_name = players[0].dataValues.team_name;
    var castle_id = players[0].dataValues.castle_id;
    var castle_name = players[0].dataValues.castle_name;
    var inv_string = players[0].dataValues.inv_string;
    var head = players[0].dataValues.head;
    var body = players[0].dataValues.body;
    var hands = players[0].dataValues.hands;
    var legs = players[0].dataValues.legs;
    var feet = players[0].dataValues.feet;
    var principal_weapon = players[0].dataValues.principal_weapon;
    var secondary_weapon = players[0].dataValues.secondary_weapon;
    console.log("name", name);
    console.log("race", race_name);
    console.log("principal weapon", principal_weapon);

    arr_items = Object.values(items);
    arr_items.sort(compare);

    var tieneElItem = false;
    itemsAndQuantity = others.decifrarInvString(inv_string);
    for (let i = 0; i < itemsAndQuantity.items.length; i++) {
      if (itemsAndQuantity.items[i] == 13) tieneElItem = true;
    }

    if (tieneElItem) {
      if (principal_weapon != null) {
        principalWeapon = arr_items[principal_weapon - 1];
        atk -= principalWeapon.atk;
        def -= principalWeapon.def;
        mp -= principalWeapon.mp;
        inv_string = others.addInvStringItem(inv_string, principal_weapon, 1);
        principal_weapon = null;
        await Players.update(
          { inv_string, principal_weapon, atk, def, mp },
          { where: { telegram_id: chatId } }
        );
      }

      if (principal_weapon == null) {
        atk = atk + arr_items[12].atk;
        await Players.update({ atk: atk }, { where: { telegram_id: chatId } });

        principal_weapon = 13;
        inv_string = others.deleteInvStringItem(inv_string, 13, 1);
        await Players.update(
          { inv_string, principal_weapon },
          { where: { telegram_id: chatId } }
        );

        ctx.reply("Item equiped");
      }
    }
  }
};
