const fs = require("fs");
const { Client } = require("pg");
const dbConfig = require("../../config/dbConfig");
const client = new Client(dbConfig["test"]);

client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})

class KropotkinController {
  async selectRandomKropotkin() {
    const kropotkinRandomQueryFromFile = fs.readFileSync(
      __dirname + "/../../db/sql/KropotkinRandomQuery.sql",
      "utf8"
    );
    const kropotkinRandomQueryResult = await client.query(
      kropotkinRandomQueryFromFile
    );
    return (
      kropotkinRandomQueryResult &&
      kropotkinRandomQueryResult.rows &&
      kropotkinRandomQueryResult.rows[0] &&
      kropotkinRandomQueryResult.rows[0].paragraph
    );
  }
}

module.exports = KropotkinController;

/*
const kc = new KropotkinController();
kc.selectRandomKropotkin();
 */
