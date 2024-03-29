const autoload = require("auto-load");
const Telegraf = require("telegraf");
const { authenticate } = require("./config/connect");
authenticate();
//--------------------------------------------
// Config files
//--------------------------------------------
const config = autoload("./config");

//--------------------------------------------
// Bot declaration global
//--------------------------------------------
bot = new Telegraf(config.bot.token);
//bot.use(Telegraf.log());
//--------------------------------------------
// Error handling
//--------------------------------------------
bot.catch((err) => {
  console.error("Ooops", err);
});

//--------------------------------------------
// Bot middleware for profiling
//--------------------------------------------
bot.use((ctx, next) => {
  const start = new Date();
  return next(ctx).then(() => {
    const ms = new Date() - start;
    console.log("Response time %sms", ms);
  });
});

//--------------------------------------------
// Bot basic commands
//--------------------------------------------
const commands = autoload("./commands");
/**
 * Iterates the commands to attach them to the "command" Telegraf wrapper.
 */
Object.keys(commands).forEach((commandKey) => {
  bot.command(commandKey, commands[commandKey]);
});

//--------------------------------------------
// Bot basic commands
//--------------------------------------------
const commandsItems = autoload("./commands/items");
/**
 * Iterates the commands to attach them to the "command" Telegraf wrapper.
 */
Object.keys(commandsItems).forEach((commandKey) => {
  bot.command(commandKey, commandsItems[commandKey]);
});

const commandsUseItems = autoload("./commands/useItems");
/**
 * Iterates the commands to attach them to the "command" Telegraf wrapper.
 */
Object.keys(commandsUseItems).forEach((commandKey) => {
  bot.command(commandKey, commandsUseItems[commandKey]);
});

const commandsUnequipItems = autoload("./commands/unequipItems");
/**
 * Iterates the commands to attach them to the "command" Telegraf wrapper.
 */
Object.keys(commandsUnequipItems).forEach((commandKey) => {
  bot.command(commandKey, commandsUnequipItems[commandKey]);
});

const commandsCrafts = autoload("./commands/crafts");
/**
 * Iterates the commands to attach them to the "command" Telegraf wrapper.
 */
Object.keys(commandsCrafts).forEach((commandKey) => {
  bot.command(commandKey, commandsCrafts[commandKey]);
});

const inlines = autoload("./inlines");
/**
 * Iterates the object model to get all the actions firing events.
 */
Object.keys(inlines).forEach((actionKey) => {
  let inline = inlines[actionKey];
  bot.action(inline.when, inline.do);
});

//--------------------------------------------
// Events guided by RegExp patterns or Strings.
// guided by http://telegraf.js.org/#/?id=middleware
//--------------------------------------------
const events = autoload("./events");
/**
 * Iterates the object model to get all the events and what to do when an event fires.
 */
Object.keys(events).forEach((eventKey) => {
  let event = events[eventKey];
  bot.hears(event.when, event.do);
});

//--------------------------------------------
// Listeners guided by official Telegraf documentation
// http://telegraf.js.org/#/?id=middleware
//--------------------------------------------
const listeners = autoload("./listeners");
/**
 * Iterates the object model to get all the listener firing events.
 */
Object.keys(listeners).forEach((listenerKey) => {
  let listener = listeners[listenerKey];
  bot.on(listener.when, listener.do);
});

//--------------------------------------------
// Actions guided by official Telegraf documentation
// http://telegraf.js.org/#/?id=middleware
//--------------------------------------------
const actions = autoload("./actions");
/**
 * Iterates the object model to get all the actions firing events.
 */
Object.keys(actions).forEach((actionKey) => {
  let action = actions[actionKey];
  bot.on(action.when, action.do);
});

//--------------------------------------------
// Static examples
//--------------------------------------------
bot.hears(/buy/i, (ctx) => ctx.reply("Wanna buy an i?"));

bot.startPolling();

module.exports = { bot };
