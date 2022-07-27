
const {con} = require('/home/freddy/Escritorio/repos/HDG/src/services/connect');

function isANewPlayer(msg){

  con.query(`SELECT COUNT(*) FROM player WHERE telegram_id = ${msg.chat.id}`, function (error, results, fields) {
    if (error)
        throw error;

    results.forEach(el => {
        exists= el['COUNT(*)'];
    });
});
return exists;
}
module.exports = {isANewPlayer}