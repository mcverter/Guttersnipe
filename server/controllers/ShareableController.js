const fs = require('fs');
const {Client } = require('pg')

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'guttersnipeSimple',
  password: 'postgres',
  port: 5432,
});

client.connect();

class ShareableController {
  async selectShareableWithComments(id) {
    let commentsJSON,
      shareableJSON;

    const commentsQueryFromFile = fs.readFileSync(__dirname + '/../../db/sql/CommentsQuery.sql', 'utf8');
    const shareableQueryFromFile = fs.readFileSync(__dirname + '/../../db/sql/ShareableFullQuery.sql', 'utf8');

    let commentsQueryResult = await client.query(commentsQueryFromFile);
    commentsJSON = commentsQueryResult.rows[0].json_agg;

    let shareableQueryResult = await client.query(shareableQueryFromFile);
    shareableJSON = shareableQueryResult.rows[0].json_agg;

    console.log('comments json', commentsJSON, 'shareable json', shareableJSON);
  }

  async selectShareablesList() {
    const shareableListQueryFromFile = fs.readFileSync(__dirname + '/../../db/sql/ShareableListQuery.sql', 'utf8');
    let shareableListQueryResult = await
    client.query(shareableListQueryFromFile);
    let shareableListJSON = shareableListQueryResult.rows[0].json_agg;
    console.log('shareable list json', shareableListJSON);
  }
}

module.exports = ShareableController;

/**
 * MAIN TEST FUNCTION
 */

const sc = new ShareableController();
sc.selectShareablesList();
sc.selectShareableWithComments()


/*
ned ##javascript
 <roadrunneratwast> How can a node program call a Postgres query that is defined within an.sql file, especially one with parameters. EG:  getRecord.sql = "SELECT * from RECORDS where index=?" .  How would you load that and execute it in node?  How would you replace the ? Token with a local variable?
 <buu> roadrunneratwast: connection.query(fs.readFileSync("getRecord.sql"),[index])
 <buu> roadrunneratwast: connection.query(fs.readFileSync("getRecord.sql"),[index])

 */
