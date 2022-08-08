const Players = require("../models/players");
const others = require("../others/others");
const items = others.getItemsArray();
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
  var chatId = ctx.update.message.chat.id;
  var players = await Players.findAll({
    where: {
      telegram_id: chatId,
    },
  });

  var crafts = new Array();
  for (var i = 0; i < items.length; i++) {
    if (items[i].can_be_crafted) crafts.push(items[i]);
  }

  if (players.length > 0) {
    var displayCrafteableItems = new Array();

    for (var i = 0; i < crafts.length; i++) {
      var crafteable = others.canBeCrafted(
        crafts[i].id,
        players[0].dataValues.inv_string
      );
      var itemName = crafts[i].name;
      var idItem = crafts[i].id;

      displayCrafteableItems[i] = {
        idItem,
        itemName,
        crafteable,
      };
    }

    //Compruebo si todos los items se pueden craftear 0
    //veces para decir que no hay ningun crafteo disponible
    var hayAlgunoCrafteable = false;
    for (let i = 0; i < displayCrafteableItems.length; i++) {
      if (displayCrafteableItems[i].crafteable > 0) hayAlgunoCrafteable = true;
    }

    if (hayAlgunoCrafteable) {
      var reply = `Available Crafts: `;
    } else {
      reply = "You don't have available crafts";
    }
    //Compruebo si todos los items se pueden craftear 0
    //veces para decir que no hay ningun crafteo disponible
    //end
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
