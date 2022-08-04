const Players = require("../../models/players");
const others = require("../others");
const id = 3;
const name = "Ancient papyrus";
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
    if (itemsAndQuantity.items[i] == 2) tieneElItem = true;
  }

  if (player === null) {
    console.log("El usuario esta accediendo a /i1 sin estar registrado");
  } else if (player.dataValues.race_name == "Vampire" && tieneElItem == true) {
    ctx.replyWithHTML(`
    <b>"We do not kneel"</b>
<i>
In our memories were prophecies. The arrival of foreigners and their so-called science did not take us by surprise. Knowledge housed for millennia in our books, ignored by those who judge and fear us. We don't care, how could we care, we are the link between past, present and future, we are eternal.

The Alliance of the races decided to accept these rotten blood bags that call themselves humans. Who we have known since before the Blood War. Insidious beings, greedy, plague carriers. If it weren't for the fact that the threat they portend is much greater, we wouldn't hesitate to kick them out, just as they kicked out so many of our people.
For now we have a common enemy, one who dares to look down on us, with no respect for The Order or the knowledge it harbours, puffed up in their thirst for power. They will know us, and they will also fear us. We will pledge our power to the Alliance, and every dragon will know that VAMPIRES DO NOT KNEEL.</i>

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
