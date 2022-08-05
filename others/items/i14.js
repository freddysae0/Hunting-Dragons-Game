/*

const Players = require("../../models/players");
const others = require("../others");
*/
const id = 14;
const name = "Wooden Shield";
const description = `Usable Item. This will protect you:   
+4 def
Press /u14 to equip`;

const item_id = 14;
const atk = 0;
const def = 4;
const mp = 0;
const class_id = 3;
const file_name = "wooden_shield";
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
  file_name,
  item_id,
  atk,
  def,
  mp,
  tier_id,
  tier_name,
  can_be_crafted,
  crafted_with_string,
  crafting_return,
  use,
};
