const Items = require("../models/items");

module.exports = async (ctx) => {
  await Items.sync({ force: true });
  items = [
    {
      name: "Old man letter",
      description: `This object contains important information and cannot be deleted`,
      can_be_crafted: false,
    },
    {
      name: "Ancient papyrus",
      description: `This object contains important information and cannot be deleted`,
      can_be_crafted: false,
    },
    {
      name: "Alpha Wolf Spirit",
      description: `This object contains important information and cannot be deleted`,
      can_be_crafted: false,
    },
    {
      name: "Kingdom scriptures",
      description: `This object contains important information and cannot be deleted`,
      can_be_crafted: false,
    },
    {
      name: "Mesita de grafeteo",
      description: `Una mesita de grafeteo!!`,
      can_be_crafted: true,
      crafted_with_string: "/4/.1.",
    },
    {
      name: "Espada Nordica",
      description: `Espada con barba q esperabas duh`,
      can_be_crafted: true,
      crafted_with_string: "/3/.1.",
    },
    {
      name: "Espada Hawayana",
      description: `esta espada tiene pi;a`,
      can_be_crafted: true,
      crafted_with_string: "/3/.1./1/.2.",
    },
    {
      name: "Alain",
      description: `wapo`,
      can_be_crafted: true,
      crafted_with_string: "/3/.1.",
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
};
