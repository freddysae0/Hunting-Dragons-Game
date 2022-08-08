const others = require("../others/others");

//Items Array
const items = others.getItemsArray();
//Items Array
//end
module.exports = async (ctx) => {
  s = `... Game Items With Descriptions...

    `;
  for (let i = 0; i < items.length; i++) {
    s += `-----------------------------------------------
      ${items[i].id}: ${items[i].name}
${items[i].description}
    `;
  }
  ctx.reply(s);
};
