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

    arr_items = Object.values(items);
    arr_items.sort(compare);

    if (secondary_weapon == idNumber) {
      secondaryWeapon = others.getItembyId(secondary_weapon);
      console.log(secondaryWeapon);
      atk -= secondaryWeapon.atk;
      def -= secondaryWeapon.def;
      mp -= secondaryWeapon.mp;
      inv_string = others.addInvStringItem(inv_string, secondary_weapon, 1);

      secondary_weapon = null;
      await Players.update(
        { inv_string, secondary_weapon, atk, def, mp },
        { where: { telegram_id: chatId } }
      );
      ctx.reply("Item unequiped");
    } else {
      ctx.reply("This item is already unequiped");
    }
  }
};
