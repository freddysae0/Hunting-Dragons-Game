/*

const Players = require("../../models/players");
const others = require("../others");
*/
const id = 12;
const name = "Rope";
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
  can_be_crafted,
  crafted_with_string,
  crafting_return,
  use,
};
