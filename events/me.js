const Players = require("../models/players");
const others = require("../others/others");

/* globals bot */

/**
 * Can be regular expression or String
 * @type {RegExp}
 */
module.exports.when = "Me";

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
  function compare(a, b) {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  }
  //SETTING ICONS

  const principal_weapon_id = players[0].dataValues.principal_weapon;
  const secondary_weapon_id = players[0].dataValues.secondary_weapon;
  const two_hands_weapon_id = players[0].dataValues.two_hands_weapon;

  var principalWeapon = others.getItembyId(principal_weapon_id);
  var secondaryWeapon = others.getItembyId(secondary_weapon_id);
  var twoHandsWeapon = others.getItembyId(two_hands_weapon_id);

  //SETTING ICONS
  //END

  if (players.length > 0) {
    players = players[0];
    faction = players.dataValues.faction;
    var s = `Hi ${players.dataValues.name}. You are in the Castle\u{1F3F0}. Be Welcome \n\n`;
    if (players.dataValues.is_in_quest)
      s = `Hi ${players.dataValues.name}. You are really bussy right now. \n\n`;
    s += `Race: ${players.dataValues.race_name}
    Lvl: ${players.dataValues.lvl}
    Exp: ${players.dataValues.actual_exp}/${players.dataValues.levelup_exp}
    Atk: ${players.dataValues.atk}  Def: ${players.dataValues.def}
    `;
    if (players.dataValues.mp) s += `Mp: ${players.dataValues.mp}  `;
    s += `Durabilty: ${players.dataValues.dur}
    `;
    if (players.dataValues.principal_weapon) {
      if (principalWeapon.atk > 0) {
        s += "+" + principalWeapon.atk.toString() + "⚔️";
      }
      if (principalWeapon.def > 0) {
        s += "+" + principalWeapon.def.toString() + "🛡️";
      }
      if (principalWeapon.mp > 0) {
        s += "+" + principalWeapon.mp.toString() + "🔷";
      }
      if (principalWeapon.dur > 0) {
        s += "+" + principalWeapon.dur.toString() + "💪";
      }
      s += ` ${
        others.getItembyId(players.dataValues.principal_weapon).name
      } /un${players.dataValues.principal_weapon}\n    `;
    }
    if (players.dataValues.secondary_weapon) {
      if (secondaryWeapon.atk > 0) {
        s += "+" + secondaryWeapon.atk.toString() + "⚔️";
      }
      if (secondaryWeapon.def > 0) {
        s += "+" + secondaryWeapon.def.toString() + "🛡️";
      }
      if (secondaryWeapon.mp > 0) {
        s += "+" + secondaryWeapon.mp.toString() + "🔷";
      }
      if (secondaryWeapon.dur > 0) {
        s += "+" + secondaryWeapon.dur.toString() + "💪";
      }
      s += ` ${
        others.getItembyId(players.dataValues.secondary_weapon).name
      } /un${players.dataValues.secondary_weapon}
      `;
    }
    if (players.dataValues.two_hands_weapon) {
      if (twoHandsWeapon.atk > 0) {
        s += "+" + twoHandsWeapon.atk.toString() + "⚔️";
      }
      if (twoHandsWeapon.def > 0) {
        s += "+" + twoHandsWeapon.def.toString() + "🛡️";
      }
      if (twoHandsWeapon.mp > 0) {
        s += "+" + twoHandsWeapon.mp.toString() + "🔷";
      }
      if (twoHandsWeapon.dur > 0) {
        s += "+" + twoHandsWeapon.dur.toString() + "💪";
      }
      s += ` ${
        others.getItembyId(players.dataValues.two_hands_weapon).name
      } /un${players.dataValues.two_hands_weapon}
      `;
    }
    if (players.dataValues.team_name)
      s += `Team: ${players.dataValues.team_name}
    `;
    if (players.dataValues.castle_name)
      s += `Castle: ${players.dataValues.castle_name}`;
    s += `
Press /inv to open the inventary `;
    ctx.reply(s);
  } else {
    console.log(
      `El usuario con id:${chatId} no esta logueado e intenta acceder al comando /me`
    );
  }
};
