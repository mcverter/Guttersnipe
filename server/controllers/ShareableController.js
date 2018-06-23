const fs = require('fs');
const {Client} = require('pg');
const dbConfig = require('../../config/dbConfig');
// NODE_ENV
const client = new Client(dbConfig['dev']);

client.connect();

class ShareableController {
  async selectShareableWithComments(id) {
    let commentsJSON,
      shareableJSON;

    const commentsQueryFromFile = fs.readFileSync(__dirname + '/../../db/sql/CommentsQuery.sql', 'utf8');

    const shareableQueryFromFile = {
      name: 'fetch-shareable-full',
      text: fs.readFileSync(__dirname + '/../../db/sql/ShareableFullQuery.sql', 'utf8'),
      values: [id]
    }

    client.query(shareableQueryFromFile)
      .then(res => console.log('query result', res.rows[0]))
      .catch(e => console.error(e.stack))
    let commentsQueryResult = await client.query(commentsQueryFromFile, [id]);
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
    return shareableListJSON;
  }
}

module.exports = ShareableController;

/**
 * MAIN TEST FUNCTION
 */

// const sc = new ShareableController();
// sc.selectShareablesList();
// sc.selectShareableWithComments('887c141e-7c72-4b73-bd8b-d068c74ca071')
