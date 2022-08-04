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
    var INF = 1000000000;

    for (var i = 0; i < cntItems.length; i++) cntItems[i] = 0;
    for (var i = 0; i < myItems.items.length; i++) {
      cntItems[myItems.items[i]] = myItems.quantity[i];
    }

    for (var i = 0; i < crafts.length; i++) {
      var canBeCrafted = INF;
      var itemsRequired = others.decifrarInvString(
        crafts[i].dataValues.crafted_with_string
      );

      for (var j = 0; j < itemsRequired.items.length; j++) {
        canBeCrafted = Math.min(
          canBeCrafted,
          cntItems[itemsRequired.items[j]] / itemsRequired.quantity[j]
        );
      }

      var itemName = crafts[i].dataValues.name;
      var idItem = crafts[i].dataValues.id;

      console.log(crafts[i].dataValues.id);
      displayCrafteableItems[i] = {
        idItem,
        itemName,
        canBeCrafted,
      };
    }

    var reply = `Available Crafts: `;
    for (var i = 0; i < displayCrafteableItems.length; i++) {
      if (displayCrafteableItems[i].canBeCrafted > 0) {
        reply += `
    ${displayCrafteableItems[i].itemName}: ${parseInt(
          displayCrafteableItems[i].canBeCrafted
        )} /c${parseInt(displayCrafteableItems[i].idItem)}`;
      }
    }

    ctx.reply(reply);
  } else {
  }
};
