const fs = require("fs");
const argv = process.argv;
const path = require("path");
const insertQuery = require("./../../sql/shareableQueries").insertQuery;
const { Client } = require("pg");
const dbConfig = require("./../../../config/dbConfig");
// NODE_ENV
const client = new Client(dbConfig["test"]);
client.connect();

let contents = fs.readFileSync(__dirname + "/" + argv[2]);
let shareables = JSON.parse(contents);

const defaultComment = {
  author_id: 5,
  author_name: "mitchell",
  author_role: "admin",
  comment_id: "2",
  date_posted: "November 26 1998"
};

shareables.slice(0, 5).forEach(s => {
  const {
    address,
    description,
    geolocation,
    icalendar,
    latitude,
    longitude,
    name,
    subcategory,
    time,
    comments
  } = s;
  let values = [
    address,
    description,
    geolocation,
    icalendar,
    latitude,
    longitude,
    name,
    subcategory,
    time
  ];
  client.query("SELECT NOW()", (err, res) => {
    if (err) throw err;
    console.log(res);
    client.end();
  });

  client.query(insertQuery, values, (err, result) => {
    id = result.rows[0];
    comments.forEach(c => {
      if (typeof c === "object") {
        let { title, author, user_id } = c;
      } else if (typeof c === "string") {
        let text = c;
        let { title, author, user_id } = defaultComment;
      }
      let comment_title = commentText
        .split(" ")
        .slice(0, 3)
        .join(" ");

      client.query(insertComment);
    });
  });
});
