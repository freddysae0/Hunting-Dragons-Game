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
const name = "Little magic stick";
const description = `Secondary Wand. Increase your magic skills
+2 mp
Press /u${idNumber} to equip`;

const atk = 0;
const def = 0;
const mp = 2;
const class_id = 3;
const class_name = "Usable";

const weapon_class_id = 6;
const weapon_class_name = "Secondary Wand";

const tier_id = null;
const tier_name = null;
const can_be_crafted = true;
const crafted_with_string = "/5/.1.";
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
  weapon_class_id,
  weapon_class_name,
  file_name,
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
