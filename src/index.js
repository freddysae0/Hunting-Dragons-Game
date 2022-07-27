const { Telegraf } = require("telegraf");
const { token, con } = require("../config/connect");
const { decifrarInvString } = require("./methods/components/myModules");
const bot = new Telegraf(token);

bot.start((ctx) => ctx.reply("xd"));
var player = {};
var inv = {};
bot.command("me", (ctx) => {
  con.query(
    `SELECT * FROM player WHERE telegram_id = ${ctx.update.message.chat.id}`,
    function (error, results, fields) {
      if (error) throw error;
      results.forEach((result) => {
        player = results[0];
      });
    }
  );

  ctx.reply(`You are in Nodejs Kingdom\u{1F3F0}, Be Welcome  
  
  Name: ${player.name}
  Role: ${player.role_name}
  Race: ${player.race_name}
  
  Lvl: ${player.lvl}
  Exp: ${player.actual_exp}/${player.levelup_exp}
  Atk: ${player.atk}  Def: ${player.def}
  Mp: ${player.mp}  Dur: ${player.dur}
  
  Team: ${player.team_name}
  Castle: ${player.castle_name}
  Kingdom: ${player.kingdom_name}
  
  Press /inv to open the inventary
  Press /craft to see your availabe crafts `);
});

bot.command("inv", (ctx) => {
  con.query(
    `SELECT * FROM player WHERE telegram_id = ${ctx.update.message.chat.id}`,
    function (error, results, fields) {
      if (error) throw error;

      results.forEach((result) => {
        inv = result;
      });
    }
  );

  console.log("inv_string : ");
  console.log(inv.inv_string);

  s = "/1/.12./2/.24.";
  const obj = decifrarInvString(s);
  /*
    s += item.name;
    s += ": ";
    s += item.quantity;
    s += ` 
    Press /me to see your player info  `;
 */

  ctx.reply(s);
  console.log(decifrarInvString(s));
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.launch();
