const Items = require("../models/items");

module.exports = async (ctx) => {
  await Items.sync({ force: true });
  items = [
    {
      name: "Old man letter",
      description: `This object contains important information and cannot be deleted`,
    },
    {
      name: "Ancient papyrus",
      description: `This object contains important information and cannot be deleted`,
    },
    {
      name: "Alpha Wolf Spirit",
      description: `This object contains important information and cannot be deleted`,
    },
    {
      name: "Kingdom scriptures",
      description: `This object contains important information and cannot be deleted`,
    },
  ];

  for (let i = 0; i < items.length; i++) {
    await Items.create({
      name: items[i].name,
      description: items[i].description,
    });
  }
};
