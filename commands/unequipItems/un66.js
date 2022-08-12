const autoload = require("auto-load");
const others = require("../../others/others");
const Players = require("../../models/players");
const items = autoload("./others/items");
module.exports = async (ctx) => {
  var idNumber = others.getIdForThisFilePlus(__filename, 2);
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
    var atk = players[0].dataValues.atk;
    var def = players[0].dataValues.def;
    var mp = players[0].dataValues.mp;
    var inv_string = players[0].dataValues.inv_string;
    var secondary_weapon = players[0].dataValues.secondary_weapon;
    var primary_weapon = players[0].dataValues.primary_weapon;
    var primary_weapon = players[0].dataValues.primary_weapon;
    var two_hands_weapon = players[0].dataValues.two_hands_weapon;

    arr_items = Object.values(items);
    arr_items.sort(compare);

    if (two_hands_weapon == idNumber) {
      twoHandsWeapon = others.getItembyId(two_hands_weapon);
      console.log(twoHandsWeapon);
      atk -= twoHandsWeapon.atk;
      def -= twoHandsWeapon.def;
      mp -= twoHandsWeapon.mp;
      inv_string = others.addInvStringItem(inv_string, two_hands_weapon, 1);

      two_hands_weapon = null;
      await Players.update(
        { inv_string, two_hands_weapon, atk, def, mp },
        { where: { telegram_id: chatId } }
      );
      ctx.reply("Item unequiped");
    } else {
      ctx.reply("This item is already unequiped");
    }
  }
};
