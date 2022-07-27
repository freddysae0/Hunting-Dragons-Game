const {
  con,
} = require("/home/freddy/Escritorio/repos/HDG/src/services/connect");

/*
 function createNewPlayer(msg, bot){
        // send a message to the chat acknowledging receipt of their message
       
     console.log("myModules is Linked");
     console.log(bot);
  const chatId = msg.chat.id;
  const resp = `You have entered an unknown kingdom. Not everyone is able to survive here so you're in time to leave...`
  //bot.sendMessage(chatId, resp);
  bot.sendMessage(chatId, resp, {reply_markup: JSON.stringify({ force_reply: true }),});



 }*/

function decifrarInvString(s) {
  if (typeof s != "string") return;
  var items = s.split("/");
  var quantity = s.split(".");
  var c = 0;
  var itemsnew = [];
  for (let i = 1; i < items.length; i += 2) {
    itemsnew[c] = items[i];
    c++;
  }

  c = 0;
  var quantitynew = [];
  for (let i = 1; i < quantity.length; i += 2) {
    quantitynew[c] = quantity[i];
    c++;
  }

  quantity = quantitynew;
  items = itemsnew;

  return { items, quantity };
}

module.exports = {
  decifrarInvString,
};
