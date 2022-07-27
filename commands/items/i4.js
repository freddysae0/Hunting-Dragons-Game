const Players = require("../../models/players");
const others = require("../../others");

module.exports = async (ctx) => {
  var chatId = ctx.update.message.chat.id;
  var player = await Players.findOne({
    where: {
      telegram_id: chatId,
    },
  });
  var tieneElItem = false;
  itemsAndQuantity = others.decifrarInvString(player.dataValues.inv_string);
  for (let i = 0; i < itemsAndQuantity.items.length; i++) {
    if (itemsAndQuantity.items[i] == 4) tieneElItem = true;
  }

  if (player === null) {
    console.log("El usuario esta accediendo a /i4 sin estar registrado");
  } else if (player.dataValues.race_name == "Werewolf" && tieneElItem == true) {
    ctx.replyWithHTML(`
    <b>"The herd makes us strong"</b>
<i>
    Our code is old and simple: Respect life and take only what you need. Defend yours and they will defend you. He who fights alone dies alone, but the pack survives.
    
    Our joy is pure: the frenzy of the chase, the howling at night, the warmth of your siblings, the pup joining the pack. There is no other better life.
    Young Wolf: Run, fight, howl, hunt, serve, love and grow.
    Grow soon, because they are coming.
    
    Our instinct told us. A great evil is approaching. We've known since the exiles arrived. Selfish humans, full of hatred and lawsuits. Despite having nothing in common with them, we accept them for the good of the pack. From them we learned about metals and machines, and we gave them our strength and senses.
    The alliance of the races was created and the factions took positions. Then the dragons arrived. But we had grown strong and defended ourselves. In the end, the pack survives.</i>  

`);
  }
  //var items = await Items.findAll();
};
