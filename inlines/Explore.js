const Players = require("../models/players");
const others = require("../others/others");
var subioDeNivel = false;
/* globals bot */
function subirDeLVL(
  actual_exp,
  levelup_exp,
  min_experiencia_ganada,
  max_experiencia_ganada,
  exp_recibida,
  lvl
) {
  actual_exp += exp_recibida;
  if (actual_exp >= levelup_exp) {
    subioDeNivel = true;
    actual_exp = actual_exp - levelup_exp;
    levelup_exp = Math.ceil(levelup_exp * 1.7);
    let exp_recibida = Math.floor(
      Math.random() * (max_experiencia_ganada - min_experiencia_ganada) +
        min_experiencia_ganada
    );
    min_experiencia_ganada = Math.ceil(min_experiencia_ganada * 1.3);
    max_experiencia_ganada = Math.ceil(max_experiencia_ganada * 1.4);
    lvl += 1;
    if (actual_exp >= levelup_exp) {
      /*
      console.log("Recursividad lvl:", lvl);
      console.log("actual_exp:", actual_exp);
      console.log("levelup_exp:", levelup_exp);
      console.log("exp_recibida:", exp_recibida);
      console.log("min_experiencia_ganada:", min_experiencia_ganada);
      console.log("max_experiencia_ganada:", max_experiencia_ganada);
      */
      return subirDeLVL(
        actual_exp,
        levelup_exp,
        min_experiencia_ganada,
        max_experiencia_ganada,
        exp_recibida,
        lvl
      );
    } else {
      /*console.log("Caso BASE!!! ");
      console.log("lvl:", lvl);
      console.log("actual_exp:", actual_exp);
      console.log("levelup_exp:", levelup_exp);
      console.log("exp_recibida:", exp_recibida);
      console.log("min_experiencia_ganada:", min_experiencia_ganada);
      console.log("max_experiencia_ganada:", max_experiencia_ganada);
      */
      return {
        actual_exp,
        levelup_exp,
        min_exp_per_mission: min_experiencia_ganada,
        max_exp_per_mission: max_experiencia_ganada,
        exp_recibida,
        lvl,
      };
    }
  } else return {};
}
/* when we receive the action delete, we just delete the message */
module.exports.when = "Explore";

/**
 * deletes the current message.
 * @param deleteMessage
 */

module.exports.do = async (ctx) => {
  subioDeNivel = false;

  const resources_array = others.getItemsArrayWhereResources();

  const player = await Players.findOne(
    {
      attributes: [
        "inv_string",
        "is_in_quest",
        "lvl",
        "actual_exp",
        "levelup_exp",
        "min_exp_per_mission",
        "max_exp_per_mission",
      ],
    },
    { where: { telegram_id: ctx.from.id } }
  );
  min_experiencia_ganada = player.dataValues.min_exp_per_mission;
  max_experiencia_ganada = player.dataValues.max_exp_per_mission;

  var exp_recibida = Math.floor(
    Math.random() * (max_experiencia_ganada - min_experiencia_ganada) +
      min_experiencia_ganada
  );
  /*
  console.log("min_experiencia_ganada ", min_experiencia_ganada);
  console.log("max_experiencia_ganada ", max_experiencia_ganada);
  console.log("exp_recibida ", exp_recibida);
*/
  if (player) {
    //console.log(player.dataValues);
    if (player.dataValues.is_in_quest == false) {
      Players.update(
        { is_in_quest: true },
        { where: { telegram_id: ctx.from.id } }
      );
      //console.log("player.dataValues.is_in_quest == false");

      var inv_string = player.dataValues.inv_string;
      await ctx.reply(
        "Decides adentrarte en el reino a explorar sus mas recognitos rincones. Volveras en 1 min"
      );
      setTimeout(async () => {
        var youRecibe = [];
        for (let i = 0; i < resources_array.length; i++) {
          if (others.probabilidad(resources_array[i].probability_to_be_found)) {
            randomNumber = Math.floor(Math.random() * 5 + 1);
            youRecibe.push({ i: resources_array[i], q: randomNumber });
          }
        }

        lvl = player.dataValues.lvl;
        actual_exp = player.dataValues.actual_exp;
        levelup_exp = player.dataValues.levelup_exp;
        min_experiencia_ganada = player.dataValues.min_exp_per_mission;
        max_experiencia_ganada = player.dataValues.max_exp_per_mission;
        var s = "";

        s = `You have returned of your travel, you got +${exp_recibida} EXP and:\n`;
        if (youRecibe.length == 0) {
          s = `Volviste!! No encontraste ningun objeto pero obtienes +${exp_recibida} EXP, mmm`;
          await Players.update(
            { actual_exp: actual_exp + exp_recibida },
            {
              where: {
                telegram_id: ctx.from.id,
              },
            }
          );
          /*console.log("lvl: ", lvl);
           */ await Players.update(
            Object.assign(
              subirDeLVL(
                actual_exp,
                levelup_exp,
                min_experiencia_ganada,
                max_experiencia_ganada,
                exp_recibida,
                lvl
              ),
              { inv_string, is_in_quest: false }
            ),
            {
              where: {
                telegram_id: ctx.from.id,
              },
            }
          );
        } else {
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

          await Players.update(
            { actual_exp: actual_exp + exp_recibida },
            {
              where: {
                telegram_id: ctx.from.id,
              },
            }
          );
          await Players.update(
            Object.assign(
              subirDeLVL(
                actual_exp,
                levelup_exp,
                min_experiencia_ganada,
                max_experiencia_ganada,
                exp_recibida,
                lvl
              ),
              { inv_string, is_in_quest: false }
            ),
            {
              where: {
                telegram_id: ctx.from.id,
              },
            }
          );

          if (subioDeNivel == true) {
            ctx.telegram.sendSticker(
              ctx.from.id,
              "CAACAgEAAxkBAAIZL2L2mm34mIA1A7NndtMGW6YeXAVdAALhAgACPU7RRmxLiAsLApUPKQQ"
            );
            s =
              "Congratulations!!! You have leveled up, now you can choose which skill to increase. Choose wisely here: /levelup \n \n" +
              s;
          }
        }
        ctx.reply(s);
      }, 1000);
    } else
      return await ctx.reply(
        "You're busy right now, wait to finish your actual quest"
      );
  }
};
