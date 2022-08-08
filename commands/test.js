const others = require("../others/others");

module.exports = (ctx) => {
  var xd = others.probabilidad(250);
  if (xd == true) {
    ctx.reply("TRUE");
  } else {
    ctx.reply("FALSE");
  }
};
