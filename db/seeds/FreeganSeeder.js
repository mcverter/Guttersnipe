const cheerio = require("cheerio");
const fs = require("fs");
const moment = require("moment");
require("pg-escape");
const { Client } = require("pg");
const { XMLInputParser, JSONInputParser } = require("./parsers");
const XML_MODE = false;

let parser;
if (XML_MODE) {
  parser = new XMLInputParser();
} else {
  parser = new JSONInputParser();
}

const defaultClient = new Client({
  user: "postgres",
  host: "localhost",
  database: "guttersnipeTest",
  password: "postgres",
  port: 5432
});

class FreeganSeeder {
  constructor(client) {
    if (client) {
      this.client = client;
    } else {
      defaultClient.connect();
      this.client = defaultClient;
    }
  }

  parseShareable(shareable, author_id) {
    let {
      subclass,
      name,
      description,
      address,
      longitude,
      latitude,
      time,
      // Comments
      comments,
      author
    } = parser.parseShareable(shareable);
    const insertShareableQuery = `
    SELECT SELECT_OR_INSERT_SHAREABLE(
      s_time := '${time}', 
      s_subclass := '${subclass}', 
      s_name := '${name}', 
      s_description := '${description}', 
      s_address := '${address}', 
      s_longitude := '${longitude}', 
      s_latitude := '${latitude}');`;
    this.client
      .query(insertShareableQuery)
      .then(shareable_response => {
        console.log(
          "s_response",
          shareable_response.rows[0]["select_or_insert_shareable"]
        );
        let shareable_id =
          shareable_response.rows[0]["select_or_insert_shareable"];
        let date = moment("06 Mar 2012 21:22:23 +0500").format(
          "YYYY-MM-DD hh:mm:ssZ"
        );
        console.log("date", date);
        if (comments) {
          for (let i = 0; i < comments.length; i++) {
            let { title, text } = parser.parseComment(comments, i);
            if (text && !title) {
              title = text.substring(0, 20);
            }
            console.log(
              "about to insert comment",
              "title",
              title,
              "text",
              text
            );
            const insertCommentQuery = `
            SELECT SELECT_OR_INSERT_COMMENT(
              c_text := '${text}', 
              c_title := '${title}', 
              c_shareable_id := '${shareable_id}', 
              c_user_id := '${author_id}', 
              c_posted := '${date}');
              `;
            console.log("sql statemebt", insertCommentQuery);
            this.client
              .query(insertCommentQuery)
              .then(comment_response => {
                console.log(
                  "c_response",
                  comment_response.rows[0]["select_or_insert_comment"]
                );
              })
              .catch(error => {
                console.error("aaaaaa", error);
              });
          }
        }
      })
      .catch(error => {
        console.log("error", error);
      });
  }

  seedFreegans() {
    let shareables = parser.parseShareablesList();
    const insertUserQuery = `
        SELECT SELECT_OR_INSERT_USER(
          u_email := 'mitchell.verter@gmail.com',
          u_name := 'mitchell', 
          u_expiration := NULL, 
          u_role := 'superadmin');`;
    this.client.query(insertUserQuery).then(author_response => {
      console.log(
        "a_response",
        author_response.rows[0]["select_or_insert_user"]
      );
      let author_id = author_response.rows[0]["select_or_insert_user"];
      for (let i = 0; i < shareables.length; i++) {
        this.parseShareable(shareables[i], author_id);
      }
    });
  }
}

module.exports = FreeganSeeder;
