var path = require("path");
var idString = "";
file_name = path.basename(__filename);
for (let i = 1; i < file_name.length - 3; i++) {
  idString += file_name[i];
}
idNumber = parseInt(idString);

const Players = require("../../models/players");
const others = require("../others");

const id = idNumber;
const name = "Kingdom scriptures";
const description =
  "This object contains important information and cannot be deleted";
const class_id = 1;
const class_name = "Mission Object";
const tier_id = null;
const tier_name = null;
const can_be_crafted = false;
const crafted_with_string = null;
const crafting_return = null;

async function use(ctx) {
  var chatId = ctx.update.message.chat.id;
  var player = await Players.findOne({
    where: {
      telegram_id: chatId,
    },
  });
  var tieneElItem = false;
  itemsAndQuantity = others.decifrarInvString(player.dataValues.inv_string);
  for (let i = 0; i < itemsAndQuantity.items.length; i++) {
    if (itemsAndQuantity.items[i] == 3) tieneElItem = true;
  }

  if (player === null) {
    console.log("El usuario esta accediendo a /i4 sin estar registrado");
  } else if (player.dataValues.race_name == "Fairy" && tieneElItem == true) {
    ctx.replyWithHTML(`
    <b>"A fairy tale"</b>
<i>
    Our code is old and simple: Respect life and take only what you need. Defend yours and they will defend you. He who fights alone dies alone, but the pack survives.
    
    Our joy is pure: the frenzy of the chase, the howling at night, the warmth of your siblings, the pup joining the pack. There is no other better life.
    Young Wolf: Run, fight, howl, hunt, serve, love and grow.
    Grow soon, because they are coming.
    
    Our instinct told us. A great evil is approaching. We've known since the exiles arrived. Selfish humans, full of hatred and lawsuits. Despite having nothing in common with them, we accept them for the good of the pack. From them we learned about metals and machines, and we gave them our strength and senses.
    The alliance of the races was created and the factions took positions. Then the dragons arrived. But we had grown strong and defended ourselves. In the end, the pack survives.</i>  

`);
  }
}

module.exports = {
  id,
  name,
  description,
  class_id,
  class_name,
  tier_id,
  tier_name,
  can_be_crafted,
  crafted_with_string,
  crafting_return,
  use,
};
