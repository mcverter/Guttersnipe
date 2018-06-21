const knex = require(__dirname + '/../../config/knex');
const Promise = require('bluebird');

/*
ned ##javascript
 <roadrunneratwast> How can a node program call a Postgres query that is defined within an.sql file, especially one with parameters. EG:  getRecord.sql = "SELECT * from RECORDS where index=?" .  How would you load that and execute it in node?  How would you replace the ? Token with a local variable?
 <buu> roadrunneratwast: connection.query(fs.readFileSync("getRecord.sql"),[index])
 <buu> roadrunneratwast: connection.query(fs.readFileSync("getRecord.sql"),[index])

 */

class ShareableController {
  selectShareableWithComments(id) {
    let commentsJSON,
      shareableJSON;

    const commentsQuery = `
      select json_agg(shareable_comment)
        from (
              select * from shareable_comment
              inner join guttersnipe_user gu 
                on shareable_comment.c_user_id = gu.id
        where shareable_comment.c_shareable_id = ${id}) 
        as shareable_comment`;

    const shareableQuery = `
      select row_to_json(shareable) 
      from shareable
      where shareable.id = ${id}`;
    Promise.all([
      () => {
        commentsJSON = knex.raw(commentsQuery)
      },
      () => {
        shareableJSON = knex.raw(shareableQuery)
      }])
      .then((results) => {
        console.log('results', results);
        console.log('comments json', commentsJSON, 'shareable json', shareableJSON)
      })
      .catch((error) => {
        console.error(error);
      })
  }

  selectShareablesList() {
    const shareableListQuery = `
     select json_agg(shareable)
        FROM (
      SELECT id, s_name, s_description, s_address, s_time
      FROM shareable)
      as shareable`;
    knex.raw(shareableListQuery);
  }
}

module.exports = ShareableController;
