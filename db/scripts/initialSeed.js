const cheerio = require('cheerio');
const fs = require('fs');

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
for (let i=0; i < 1/*shareables.length*/; i++) {
  parse_shareable(shareables[i])
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

function insert_shareable({subclass, name, description, address, longitude, latitude, time}) {

  knew.select('id').from('shareable')
    .where({subclass, })
  console.log(`IF NOT EXISTS (
        SELECT id FROM shareables
        WHERE
          subclass=${subclass},
          name=${name},
          description =${description},
          address =${address},
          longitude =${longitude},
          latitude =${latitude},
          time =${time});)

  THEN
  INSERT INTO shareables (subclass, name, description, address, longitude, latitude, time)
    VALUES(${subclass}, ${name}, ${description}, ${address}, ${longitude}, ${latitude}, ${time})
    RETURNING id)
  ELSE
        SELECT id FROM shareables
        WHERE
          subclass=${subclass},
          name=${name},
          description =${description},
          address =${address},
          longitude =${longitude},
          latitude =${latitude},
          time =${time});)
`)
}


function parse_shareable(shareable, index) {
  let $ = cheerio.load(shareable);


  let
    // thing
    subclass = 'dumpster',
    name = $('Name').text(),
    description = $('Description').text(),
    // space
    longitude = $('Longitude').text(),
    latitude = $('Latitude').text(),
    address = $('Address').text(),
    // time
    time = $('Time').text(),

    // Comments
    comments = $('Comments').text(),
    author = $('Author').text();

  let insertStatement = ()=>1;
  let shareable_id = insertStatement();
  let author_id = ()=>1
  for (i=0;i<comments.length;i++) {
    parse_comment(comments[i], {shareable_id, author_id});
  }

  knex.raw('SELECT INSERT_SHAREABLE(:subclass, :shareable_name, :description, :address, :longitude, :latitude, :time) ', {
    subclass,
    shareable_name: name,
    description,
    address,
    longitude,
    latitude,
    time
    }
  )
//  (${subclass}, ${name}, ${description}, ${address}, ${longitude}, ${latitude}, ${time}`)
    .then(response=>{
    console.log('response', response)
  })
    .catch(error=>{
      console.log('error', error)
    });
//  insert_shareable({subclass, name, description, address, longitude, latitude, time})

//  console.log(`${subclass} ${name} ${description} ${address} ${longitude} ${latitude} ${time}`);

}





  /*

  Subclass table connects to class

  But subclass is only necessary not class for shareable



 <roadrunneratwast> Is it possible to get a field from a newly inserted row?  EG: SELECT id FROM(INSERT values('foo') INTO table))
 <zelest> RETURNING :)
 √INSERT INTO table VALUES('foo') RETURNING id
 <roadrunneratwast> thanks
      Comments= childrenComponent,
      AuthorDate = childrenComponent,
      AuthorName = childrenComponent,
      CommentTitle = childrenComponent,
      CommentText = childrenComponent,

   */

