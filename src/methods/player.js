const { con } = require("../../config/connect");
const { isANewPlayer } = require("./components/isANewPlayer");
const { createNewPlayer } = require("./components/myModules");

function start(msg, bot) {
  const isANP = isANewPlayer(msg);

  if (!isANP) {
    createNewPlayer(msg, bot);
  }
}

function me(msg, bot) {
  con.query(
    `SELECT * FROM player WHERE telegram_id = ${msg.chat.id}`,
    function (error, results, fields) {
      if (error) throw error;

      results.forEach((result) => {
        console.log(result);
        player = result;
      });
    }
  );
  console.log("el watch funciona");

  const chatId = msg.chat.id;
  const resp = `You are in Nodejs Kingdom\u{1F3F0}, Be Welcome  

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
Press /craft to see your availabe crafts `;

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
}
function inv(msg, bot) {
  console.log("el watch funciona");

  const chatId = msg.chat.id;
  const resp = `Your Inventory

Sticks: ...
Cloths: ...
Books: ...
Silver: ...
Videogames: xx

Press /me to see your player info `;

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
}

module.exports = {
  me,
  inv,
  start,
};
