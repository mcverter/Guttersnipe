const fs = require("fs");
const defaultState = require("./initialState");

// connect db
const { Client } = require("pg");
require('dotenv').config();
let client = new Client({connectionString: process.env.DATABASE_URL});
client.connect((err) => {
  if (err) {console.error('connection error', err.stack)}
  else {console.log('connected')}
});

class ShareableController {
  async selectShareableWithComments(id) {
    let commentsJSON, shareableJSON;

    const commentsQueryFromFile = fs.readFileSync(
      __dirname + "/../../db/sql/CommentsQuery.sql",
      "utf8"
    );
    let commentsQueryResult = await client.query(commentsQueryFromFile, [id]);
    commentsJSON = commentsQueryResult.rows[0]["json_agg"];

    const shareableFullQuery = fs.readFileSync(
      __dirname + "/../../db/sql/ShareableFullQuery.sql",
      "utf8"
    );
    let shareableQueryResult = await client.query(shareableFullQuery, [id]);
    shareableJSON = shareableQueryResult.rows[0]["json_agg"];

    console.log("comments json", commentsJSON, "shareable json", shareableJSON);
    return { commentsJSON, shareableJSON };
  }

  async selectShareablesList() {
    const shareableListQueryFromFile = fs.readFileSync(
      __dirname + "/../../db/sql/AllShareablesQuery.sql", "utf8");
    let shareableListQueryResult = await client.query(
      shareableListQueryFromFile
    );
    let shareableListJSON = shareableListQueryResult.rows[0]["json_agg"];
    return shareableListJSON;
  }
}

module.exports = ShareableController;

/**
 * MAIN TEST FUNCTION

// const sc = new ShareableController();
// sc.selectShareablesList();
// sc.selectShareableWithComments('887c141e-7c72-4b73-bd8b-d068c74ca071')
 */
