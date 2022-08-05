/*

const Players = require("../../models/players");
const others = require("../others");
*/
const id = 13;
const name = "Wood Sword";
const description = `Usable Item. This hurts:  
+3 atk
Press /u13 to equip`;
const class_id = 3;
const class_name = "Usable";
const tier_id = null;
const tier_name = null;
const can_be_crafted = true;
const crafted_with_string = "/5/.3.";
const crafting_return = 1;

async function use(ctx) {
  ctx.reply(description);
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
