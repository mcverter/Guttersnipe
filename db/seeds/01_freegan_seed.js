const cheerio = require('cheerio');
const fs = require('fs');
require('pg-escape');
const moment = require('moment');
/*
var knex = require('knex')({
  client: 'postgres',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'postgres',
    database : 'guttersnipeSimple'
  }
});
*/
function superescape(string) {
  return escape(string.trim().replace(/\s+/g, ' '));
}
function seedFregans(knex, Promise) {
  const fileContents = fs.readFileSync(__dirname + '/../data/html/BrooklynDirectory.xml.html', 'utf8');
  const frontMarkerString = `const Content = () => (`;
  let xml = fileContents.substring(fileContents.indexOf(frontMarkerString));
  xml = xml.substring(frontMarkerString.length, xml.indexOf(');'))
  let $ = cheerio.load(xml);

  knex.raw(`
        SELECT SELECT_OR_INSERT_USER(
          email := 'mitchell.verter@gmail.com',
          name := 'mitchell', 
          expiration := NULL, 
          role := 'superadmin');`)
    .then((author_response)=>{
      console.log('a_response', author_response.rows[0]['select_or_insert_user']);
      let author_id = author_response.rows[0]['select_or_insert_user'];
      const shareables = $('Shareable');
      for (let i = 0; i < shareables.length; i++) {
        parse_shareable(knex, shareables[i], author_id)
      }})

}
function parse_shareable(knex, shareable, author_id) {
  let $ = cheerio.load(shareable);
  let
    // thing
    subclass = escape('dumpster'),
    name = superescape($('Name').text()),
    description = superescape($('Description').text()),
    // space
    address = superescape($('Address').text()),
    longitude = $('Longitude').text(),
    latitude = $('Latitude').text(),
    // time
    time = superescape($('Time').text()),

    // Comments
    comments = $('Comment'),
    author = $('Author').text();
  console.log(subclass, name, description, longitude, latitude, address, time);
  knex.raw(`
    SELECT SELECT_OR_INSERT_SHAREABLE(
      shareable_time := '${time}', 
      subclass := '${subclass}', 
      name := '${name}', 
      description := '${description}', 
      address := '${address}', 
      longitude := '${longitude}', 
      latitude := '${latitude}');`)
    .then(shareable_response=>{
      console.log('s_response', shareable_response.rows[0]['select_or_insert_shareable']);
      let shareable_id = shareable_response.rows[0]['select_or_insert_shareable'];
      var date =
        moment('06 Mar 2012 21:22:23 +0500').format('YYYY-MM-DD hh:mm:ssZ');
      console.log('date', date);
      let title, text;
      for (i=0;i<comments.length;i++) {
        let $comment = cheerio.load(comments[i]);
        if ($comment('CommentTitle').text()) {
          title = superescape($comment('CommentTitle').text());
          text = superescape($comment('CommentText').text());
        } else {
          text = superescape($comment.text());
          title = text.substring(0, 20);
        }
        console.log('about to insert comment', 'title', title, 'text', text)
        knex.raw(`
            SELECT SELECT_OR_INSERT_COMMENT(
              text := '${text}', 
              title := '${title}', 
              c_s_id := '${shareable_id}', 
              c_u_id := '${author_id}', 
              c_posted := '${date}');
              `)
          .then(comment_response=>{
            console.log('c_response', comment_response.rows[0]['select_or_insert_comment']);
          })

      }
    })
    .catch(error=>{
      console.log('error', error)
    });
}

exports.seed = seedFregans;

var knex = require('knex')({
  client: 'postgres',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'postgres',
    database : 'guttersnipeSimple'
  }
});


seedFregans(knex);
