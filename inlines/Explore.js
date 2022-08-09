const Players = require("../models/players");
const others = require("../others/others");

/* globals bot */

/* when we receive the action delete, we just delete the message */
module.exports.when = "Explore";

/**
 * deletes the current message.
 * @param deleteMessage
 */

module.exports.do = async (ctx) => {
  const resources_array = others.getItemsArrayWhereResources();
  const player = await Players.findOne(
    { attributes: ["inv_string"] },
    { where: { telegram_id: ctx.from.id } }
  );

  var s = "You have returned of your travel, you got:\n";
  var inv_string = player.dataValues.inv_string;
  await ctx.reply(
    "Decides adentrarte en el reino a explorar sus mas recognitos rincones. Volveras en 1 min"
  );
  setTimeout(async () => {
    var youRecibe = [];
    for (let i = 0; i < resources_array.length; i++) {
      if (others.probabilidad(resources_array[i].probability_to_be_found)) {
        var randomNumber = Math.floor(Math.random() * 10 + 1);
        youRecibe.push({ i: resources_array[i], q: randomNumber });
      }
    }

    if (youRecibe.length == 0) ctx.reply("Volviste!! No recibiste nada, mmm");
    else {
      for (let i = 0; i < youRecibe.length; i++) {
        s += "+";
        s += youRecibe[i].q.toString();
        s += " ";
        s += youRecibe[i].i.name;
        s += "\n";
        inv_string = others.addInvStringItem(
          inv_string,
          youRecibe[i].i.id,
          youRecibe[i].q
        );
      }
      ctx.reply(s);
      await Players.update(
        { inv_string },
        {
          where: {
            telegram_id: ctx.from.id,
          },
        }
      );
    }
  }, 60000);
};
