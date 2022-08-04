const Players = require("../models/players");
const others = require("../others/others");
const Items = require("../models/items");
/* globals bot */

/**
 * Can be regular expression or String
 * @type {RegExp}
 */
module.exports.when = "Craft";

/**
 * What to do when the pattern fires ?
 * @param ctx
 */
module.exports.do = async (ctx) => {
  await Players.sync();
  await Items.sync();
  var chatId = ctx.update.message.chat.id;
  var players = await Players.findAll({
    where: {
      telegram_id: chatId,
    },
  });
  var crafts = await Items.findAll({
    /* attributes: ["crafted_with_string"], */
    where: {
      can_be_crafted: true,
    },
  });

  if (players.length > 0) {
    var displayCrafteableItems = new Array();
    var cntItems = new Array(30);
    var myItems = others.decifrarInvString(players[0].dataValues.inv_string);

    console.log(myItems);

    for (var i = 0; i < cntItems.length; i++) cntItems[i] = 0;
    for (var i = 0; i < myItems.items.length; i++) {
      cntItems[myItems.items[i]] = myItems.quantity[i];
    }

    for (var i = 0; i < crafts.length; i++) {
      var crafteable = others.canBeCrafted(
        crafts[i].dataValues.name,
        crafts[i].dataValues.crafted_with_string,
        cntItems
      );
      var itemName = crafts[i].dataValues.name;
      var idItem = crafts[i].dataValues.id;

      displayCrafteableItems[i] = {
        idItem,
        itemName,
        crafteable,
      };
      console.log(displayCrafteableItems[i]);
    }

    var reply = `Available Crafts: `;
    for (var i = 0; i < displayCrafteableItems.length; i++) {
      if (displayCrafteableItems[i].crafteable > 0) {
        reply += `
    ${displayCrafteableItems[i].itemName}: ${
          displayCrafteableItems[i].crafteable
        } /c${parseInt(displayCrafteableItems[i].idItem)}`;
      }
    }

    ctx.reply(reply);
  } else {
  }
};
