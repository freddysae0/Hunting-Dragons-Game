const others = require("../others/others");

//Items Array
const items = others.getItemsArray();
//Items Array
//end
module.exports = async (ctx) => {
  s = `... Game Items ...

    `;
  for (let i = 0; i < items.length; i++) {
    s += `${items[i].id}: ${items[i].name}
    `;
  }
  ctx.reply(s);
};
