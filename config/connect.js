const { Sequelize } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const con = new Sequelize("hdgdb", "hdg", "3S6f!0UjfGeQ", {
  host: "152.206.119.219",
  dialect: "mysql",
});

async function authenticate() {
  try {
    await con.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

token = "5516173399:AAETwBd4oJos6jfKvlAYXSziHWBwkeLjvbg";
module.exports = {
  authenticate,
  con,
  token,
};
