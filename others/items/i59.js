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
const name = "Rope";
//La probabilidad se tomara en base a 1000. Por ejemplo 240/1000.
//De cada 1000 veces que se busque este objeto 240 lo encontrara
const probability_to_be_found = 100;

const description = "Tie that up before it slips away";
const class_id = 2;
const class_name = "Resource";
const tier_id = null;
const tier_name = null;
const can_be_crafted = true;
const crafted_with_string = "/6/.2.";
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
  probability_to_be_found,
  can_be_crafted,
  crafted_with_string,
  crafting_return,
  use,
};
