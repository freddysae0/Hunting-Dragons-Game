const others = require("../../others/others");
file = others.getIdForThisFile(__filename);
const { use } = require("../../others/items/i" + file.toString());
module.exports = (ctx) => {
  use(ctx);
};
