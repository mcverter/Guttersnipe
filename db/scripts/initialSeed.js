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
      console.log('response', shareable_response.rows[0]['select_or_insert_shareable']);
      let shareable_id = shareable_response.rows[0]['select_or_insert_shareable'];
      knex.raw(`SELECT SELECT_OR_INSERT_AUTHOR(shareable_time := '${time}', subclass := '${subclass}', name := '${name}', description := '${description}', address := '${address}', longitude := '${longitude}', latitude := '${latitude}');`)
        .then((author_response)=>{
          let author_id = ()=>1
          for (i=0;i<comments.length;i++) {
            parse_comment(comments[i], {shareable_id, author_id});
            knex.raw(`SELECT SELECT_OR_INSERT_COMMENT(shareable_time := '${time}', subclass := '${subclass}', name := '${name}', description := '${description}', address := '${address}', longitude := '${longitude}', latitude := '${latitude}');`)
              .then(comment_response=>{
              })
          }
        })
    })
    .catch(error=>{
      console.log('error', error)
    });

}



function parse_comment(comment, {shareable_id, author_id}) {
  let commentTitle,
    commentText;
}

function insert_comment() {

}

function insert_user() {

}

function insert_admin() {

}

function get_shareable_id() {

}
