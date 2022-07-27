/* globals bot */
const CreatingPlayers = require("../models/creatingPlayers");
const InitialStatsByClases = require("../models/initialStatsByClases");
const Players = require("../models/players");
/* fires when we receive a sticker */
module.exports.when = "text";

/* What to do when the bot gets a sticker */
module.exports.do = async (ctx) => {
  var chatId = ctx.from.id;
  var creatingPlayers = await CreatingPlayers.findAll({
    where: {
      telegram_id: chatId,
    },
  });
  if (creatingPlayers.length > 0) {
    race_id = creatingPlayers[0].dataValues.race_id;
    role_id = creatingPlayers[0].dataValues.role_id;
    console.log("creatingPlayers.length > 0  in tellMeYourName.js");
    console.log(race_id);
    console.log(role_id);

    const message_text = ctx.update.message.text;
    if (race_id > 0 && role_id > 0) {
      //Aqui deberia el usuario agregarse a la base de datos Players y comenzar el juego
      console.log("race_id > 0 && role_id > 0 in tellMeYourName.js");
      console.log("DIME TU NOMBRE");
      await CreatingPlayers.update(
        {
          name: message_text,
        },
        {
          where: {
            telegram_id: chatId,
          },
        }
      );

      /*     //This is a Debuger.. its no necesary for code works
      var creating = await CreatingPlayers.findAll({
        where: {
          telegram_id: chatId,
        },
      });
      console.log(creatingPlayers[0]);
      
*/
      var isbc = await InitialStatsByClases.findAll({
        where: { role_id: creatingPlayers[0].dataValues.role_id },
      });
      //buff raciales ---------------
      if (creatingPlayers[0].dataValues.race_name == "Human") {
        isbc[0].dataValues.mp += 2;
        isbc[0].dataValues.atk += 1;
        isbc[0].dataValues.def += 1;
        s = "/1/.1.";
      }

      if (creatingPlayers[0].dataValues.race_name == "Fairy") {
        isbc[0].dataValues.mp += 2;
        isbc[0].dataValues.atk += 2;
        s = "/3/.1.";
      }

      if (creatingPlayers[0].dataValues.race_name == "Werewolf") {
        isbc[0].dataValues.atk += 2;
        isbc[0].dataValues.def += 2;
        s = "/4/.1.";
      }

      if (creatingPlayers[0].dataValues.race_name == "Vampire") {
        isbc[0].dataValues.atk += 2;
        isbc[0].dataValues.def += 2;
        s = "/2/.1.";
      }
      //end buff raciales ---------------
      //...........................
      await Players.sync();
      await Players.create({
        telegram_id: chatId,
        inv_string: s,
        lvl: 1,
        actual_exp: 0,
        levelup_exp: 5,
        race_name: creatingPlayers[0].dataValues.race_name,
        race_id: creatingPlayers[0].dataValues.race_id,
        role_name: creatingPlayers[0].dataValues.role_name,
        role_id: creatingPlayers[0].dataValues.role_id,
        atk: isbc[0].dataValues.atk,
        def: isbc[0].dataValues.def,
        mp: isbc[0].dataValues.mp,
        dur: isbc[0].dataValues.dur,
        name: message_text,
      });
      await CreatingPlayers.drop({ where: { telegram_id: chatId } });
      const INITIAL_KEYBOARD = [
        [{ text: "Me" }, { text: "Explore" }],
        [{ text: "Craft" }, { text: "Castle" }],
      ];

      await ctx.telegram.sendMessage(ctx.from.id, "YUPIII CREASTE TU PLAYER", {
        reply_markup: {
          keyboard: INITIAL_KEYBOARD,
          resize_keyboard: true,
        },
      });
    }
  }
};
