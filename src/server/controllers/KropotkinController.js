const fs = require("fs");

// connect db
const { Client } = require("pg");
require('dotenv').config();
let client = new Client({connectionString: process.env.DATABASE_URL});
client.connect();

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
