/*

const Players = require("../../models/players");
const others = require("../others");
*/
const id = 6;
const name = "Vegetal Fiber";
//La probabilidad se tomara en base a 1000. Por ejemplo 240/1000.
//De cada 1000 veces que se busque este objeto 240 lo encontrara
const probability_to_be_found = 210;

const description =
  "A very commun object, is normal to see it in floor or trees";
const class_id = 2;
const class_name = "Resource";
const tier_id = null;
const tier_name = null;
const can_be_crafted = false;
const crafted_with_string = null;
const crafting_return = null;

async function use(ctx) {
  ctx.reply(description);
}

module.exports = {
  id,
  name,
  description,
  class_id,
  class_name,

  probability_to_be_found,
  tier_id,
  tier_name,
  can_be_crafted,
  crafted_with_string,
  crafting_return,
  use,
};
