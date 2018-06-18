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
function seedFregans(knex, Promise) {
  const fileContents = fs.readFileSync(__dirname + '/../data/html/BrooklynDirectory.xml.html', 'utf8');
  const frontMarkerString = `const Content = () => (`;
  let xml = fileContents.substring(fileContents.indexOf(frontMarkerString));
  xml = xml.substring(frontMarkerString.length, xml.indexOf(');'))
  let $ = cheerio.load(xml);

  const shareables = $('Shareable');
  for (let i = 0; i < shareables.length; i++) {
    parse_shareable(knex, shareables[i])
  }

}
function parse_shareable(knex, shareable) {
  let $ = cheerio.load(shareable);
  let
    // thing
    subclass = escape('dumpster'),
    name = escape($('Name').text()),
    description = escape($('Description').text()),
    // space
    address = escape($('Address').text()),
    longitude = $('Longitude').text(),
    latitude = $('Latitude').text(),
    // time
    time = escape($('Time').text()),

    // Comments
    comments = $('Comments'),
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
      knex.raw(`
        SELECT SELECT_OR_INSERT_USER(
          email := 'mitchell.verter@gmail.com',
          name := 'mitchell', 
          expiration := NULL, 
          role := 'superadmin');`)
        .then((author_response)=>{
          console.log('a_response', author_response.rows[0]['select_or_insert_user']);
          var date =
            moment('06 Mar 2012 21:22:23 +0500').format('YYYY-MM-DD hh:mm:ssZ');
          console.log('date', date);
          let author_id = author_response.rows[0]['select_or_insert_user'];
          let title, text;
          for (i=0;i<comments.length;i++) {
            let $comment = cheerio.load(comments[i]);
            if ($('CommentTitle').text()) {
              title = escape($('CommentTitle').text().trim());
              text = escape($('CommentText').text().trim());
            } else {
              text = escape($.text().trim());
              title = text.substring(0, 20);
            }
            knex.raw(`
            SELECT SELECT_OR_INSERT_COMMENT(
              c_text := '${text}', 
              c_title := '${title}', 
              c_s_id := '${shareable_id}', 
              c_u_id := '${author_id}', 
              c_posted := '${date}');
              `)
              .then(comment_response=>{
                console.log('c_response', comment_response.rows[0]['select_or_insert_comment']);
              })

          }
        })
    })
    .catch(error=>{
      console.log('error', error)
    });
}

exports.seed = seedFregans;

seedFreegans();
