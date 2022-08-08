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
const name = "Old man letter";
const description =
  "This is a very important object, that you have to give to the Fairy queen";
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
    if (itemsAndQuantity.items[i] == 1) tieneElItem = true;
  }

  if (player === null) {
    console.log("El usuario esta accediendo a /i1 sin estar registrado");
  } else if (player.dataValues.race_name == "Human" && tieneElItem == true) {
    ctx.replyWithHTML(`
    <b>\"We are survivors\"</b>

    <i>Like a curtain the sky opened above our heads. Stunned we listen to the order given by that imposing creature: "Go, kill and conquer!". Then they arrived. Vile beings from another world descended upon our land, breathing fire and laying waste to everything in their path. Alarms were raised, word spread and the battle began. The human kingdoms stood ready to meet the threat, but there was little we could do with our divided forces. Our spears and swords shattered against their stony scales, our arrows fell from their wings, every war machine destroyed in moments by a sweep of their tails, and our armor was no match for their claws and flames. Heroes, monarchs and generals, all succumbed to one.
    In a short time a cry marked terror among men: Dragon!!!
    Our home had fallen, and our options reduced to death, slavery, or exile. Thousands of us crossed the sea to another continent, until now avoided by humans. We reach new shores as harbingers of the end of the world. Races, only known in old stories made pacts with us. Creatures brimming with magic, they would teach us their ancient arts and we would give them our science. Thus, an alliance was formed and factions arose from each territory of the continent in order to protect it. It wouldn't be long before the dragons crossed the sea, hoping to repeat history. But this time we would be waiting for them.</i>

`);
  }
  //var items = await Items.findAll();
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
