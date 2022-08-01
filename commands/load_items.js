const Items = require("../models/items");

module.exports = async (ctx) => {
  await Items.sync({ force: true });
  items = [
    {
      id: 1,
      name: "Old man letter",
      description: `This object contains important information and cannot be deleted`,
      can_be_crafted: false,
    },
    {
      id: 2,
      name: "Ancient papyrus",
      description: `This object contains important information and cannot be deleted`,
      can_be_crafted: false,
    },
    {
      id: 3,
      name: "Alpha Wolf Spirit",
      description: `This object contains important information and cannot be deleted`,
      can_be_crafted: false,
    },
    {
      id: 4,
      name: "Kingdom scriptures",
      description: `This object contains important information and cannot be deleted`,
      can_be_crafted: false,
    },
    {
      id: 5,
      name: "Stick",
      description: `A very commun object`,
      can_be_crafted: false,
    },
    {
      id: 6,
      name: "Vegetal Fiber",
      description: `A very commun object`,
      can_be_crafted: false,
    },
    {
      id: 7,
      name: "Sand",
      description: `A comun object`,
      can_be_crafted: false,
    },
    {
      id: 8,
      name: "Dirt",
      description: `A comun object`,
      can_be_crafted: false,
    },
    {
      id: 9,
      name: "Fairy dust",
      description: `A comun object`,
      can_be_crafted: false,
    },
    {
      id: 10,
      name: "Stone",
      description: `A very comun object`,
      can_be_crafted: false,
    },
    {
      id: 11,
      name: "Thread",
      description: `Perfect to cover your girlfriend in cold weather. Wait... What girlfriend?`,
      can_be_crafted: false,
    },
    {
      id: 12,
      name: "Rope",
      description: `Tie that up before it slips away`,
      can_be_crafted: true,
      crafted_with_string: "/6/.2.",
    },

    {
      id: 13,
      name: "Wood Sword",
      description: `This hurts:  +3 atk`,
      can_be_crafted: true,
      crafted_with_string: "/5/.3.",
    },
    {
      id: 14,
      name: "Wood Shield",
      description: `This will protect you:  +4 def`,
      can_be_crafted: true,
      crafted_with_string: "/5/.6.",
    },
  ];

  for (let i = 0; i < items.length; i++) {
    await Items.create({
      name: items[i].name,
      description: items[i].description,
      can_be_crafted: items[i].can_be_crafted,
      crafted_with_string: items[i].crafted_with_string,
    });
  }
  ctx.reply("Items loaded ");
};
