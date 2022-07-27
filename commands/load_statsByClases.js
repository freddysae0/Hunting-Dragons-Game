const InitialStatsByClases = require("../models/initialStatsByClases");

module.exports = async (ctx) => {
  items = [
    {
      role_name: "Fighter",
      role_id: 5,
      atk: 3,
      def: 1,
      mp: 1,
      dur: 1,
    },
    {
      role_name: "Vident",
      role_id: 4,
      atk: 1,
      def: 1,
      mp: 3,
      dur: 1,
    },
    {
      role_name: "Lifestealer",
      role_id: 2,
      atk: 3,
      def: 1,
      mp: 1,
      dur: 1,
    },
    {
      role_name: "Healer",
      role_id: 1,
      atk: 1,
      def: 1,
      mp: 3,
      dur: 1,
    },
    {
      role_name: "Protector",
      role_id: 3,
      atk: 1,
      def: 3,
      mp: 1,
      dur: 1,
    },
  ];

  await InitialStatsByClases.sync({ force: true });
  for (let i = 0; i < items.length; i++) {
    await InitialStatsByClases.create({
      role_name: items[i].role_name,
      role_id: items[i].role_id,
      atk: items[i].atk,
      def: items[i].def,
      mp: items[i].mp,
      dur: items[i].dur,
    });
  }

  console.log("--------------------");

  log = await InitialStatsByClases.findAll();
  console.log(log);
  console.log("--------------------");
};
