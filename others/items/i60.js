/*

const Players = require("../../models/players");
const others = require("../others");
*/
const id = 13;
const name = "Wooden Sword";
const description = `Usable Item. This hurts:  
+3 atk
Press /u13 to equip`;
const item_id = 13;
const atk = 3;
const def = 0;
const mp = 0;

const class_id = 3;
const file_name = "wooden_sword";
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
  file_name,
  item_id,
  atk,
  def,
  mp,
  class_name,
  tier_id,
  tier_name,
  can_be_crafted,
  crafted_with_string,
  crafting_return,
  use,
};
