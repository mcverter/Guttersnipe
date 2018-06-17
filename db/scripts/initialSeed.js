const cheerio = require('cheerio');
const fs = require('fs');
require('pg-escape');

var knex = require('knex')({
  client: 'postgres',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'postgres',
    database : 'guttersnipeSimple'
  }
});

const fileContents = fs.readFileSync('../data/html/BrooklynDirectory.xml.html', 'utf8');
const frontMarkerString = `const Content = () => (`;
let xml = fileContents.substring(fileContents.indexOf(frontMarkerString));
xml = xml.substring(frontMarkerString.length, xml.indexOf(');'))
let $ = cheerio.load(xml);

const shareables = $('Shareable');
for (let i=0; i < shareables.length; i++) {
  parse_shareable(shareables[i])
}


function parse_shareable(shareable, index) {
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
    comments = $('Comments').text(),
    author = $('Author').text();

  console.log(subclass, name, description, longitude, latitude, address, time);
  knex.raw(`SELECT SELECT_OR_INSERT_SHAREABLE(shareable_time := '${time}', subclass := '${subclass}', name := '${name}', description := '${description}', address := '${address}', longitude := '${longitude}', latitude := '${latitude}');`)
    .then(shareable_response=>{
      console.log('s_response', shareable_response.rows[0]['select_or_insert_shareable']);
      let shareable_id = shareable_response.rows[0]['select_or_insert_shareable'];
      knex.raw(`SELECT SELECT_OR_INSERT_USER(email := 'mitchell.verter@gmail.com', name := 'mitchell', expiration := NULL, role := 'superadmin');`)
        .then((author_response)=>{
          console.log('a_response', author_response.rows[0]['select_or_insert_user']);
          let author_id = author_response.rows[0]['select_or_insert_user'];
          for (i=0;i<comments.length;i++) {

/*
            knex.raw(`SELECT SELECT_OR_INSERT_COMMENT(shareable_time := '${time}', subclass := '${subclass}', name := '${name}', description := '${description}', address := '${address}', longitude := '${longitude}', latitude := '${latitude}');`)
              .then(comment_response=>{
              })
*/
          }
        })
    })
    .catch(error=>{
      console.log('error', error)
    });
}
