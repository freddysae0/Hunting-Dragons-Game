const Items = require("../models/items");

module.exports = async (ctx) => {
  await Items.sync();
  items = await Items.findAll();
  for (let i = 0; i < items.length; i++) {
    await ctx.reply(
      items[i].dataValues.id.toString() +
        "  ==>  " +
        items[i].dataValues.name.toString()
    );
  }
};
