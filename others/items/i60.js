var path = require("path");
var idString = "";
file_name = path.basename(__filename);
for (let i = 1; i < file_name.length - 3; i++) {
  idString += file_name[i];
}
idNumber = parseInt(idString);
/*

const Players = require("../../models/players");
const others = require("../others");
*/
const id = idNumber;
const name = "Wooden Sword";
const description = `Usable Item. This hurts:  
+3 atk
Press /u13 to equip`;
const item_id = 13;
const atk = 3;
const def = 0;
const mp = 0;

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
  file_name,
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