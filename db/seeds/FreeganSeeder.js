const cheerio = require("cheerio");
const fs = require("fs");
const moment = require("moment");
require("pg-escape");
const { Client } = require("pg");

const defaultClient = new Client({
  user: "postgres",
  host: "localhost",
  database: "guttersnipeTest",
  password: "postgres",
  port: 5432
});

function superescape(string) {
  return escape(string.trim().replace(/\s+/g, " "));
}

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
    let $ = cheerio.load(shareable);
    let // thing
      subclass = escape("dumpster"),
      name = superescape($("Name").text()),
      description = superescape($("Description").text()),
      // space
      address = superescape($("Address").text()),
      longitude = $("Longitude").text(),
      latitude = $("Latitude").text(),
      // time
      time = superescape($("Time").text()),
      // Comments
      comments = $("Comment"),
      author = $("Author").text();
    console.log(
      subclass,
      name,
      description,
      longitude,
      latitude,
      address,
      time
    );
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
        let title, text;
        for (let i = 0; i < 1; i++) {
          let $comment = cheerio.load(comments[i]);
          if ($comment("CommentTitle").text()) {
            title = superescape($comment("CommentTitle").text());
            text = superescape($comment("CommentText").text());
          } else {
            text = superescape($comment.text());
            title = text.substring(0, 20);
          }
          console.log("about to insert comment", "title", title, "text", text);
          const insertCommentQuery = `
            SELECT SELECT_OR_INSERT_COMMENT(
              c_text := '${text}', 
              c_title := '${title}', 
              c_shareable_id := '${shareable_id}', 
              c_user_id := '${author_id}', 
              c_posted := '${date}');
              `;
          console.log("sql statemebt", insertCommentQuery);
          this.client.query(insertCommentQuery).then(comment_response => {
            console.log(
              "c_response",
              comment_response.rows[0]["select_or_insert_comment"]
            );
          });
        }
      })
      .catch(error => {
        console.log("error", error);
      });
  }
  seedFreegans() {
    const fileContents = fs.readFileSync(
      __dirname + "/../data/html/BrooklynDirectory.xml.html",
      "utf8"
    );
    const frontMarkerString = `const Content = () => (`;
    let xml = fileContents.substring(fileContents.indexOf(frontMarkerString));
    xml = xml.substring(frontMarkerString.length, xml.indexOf(");"));
    let $ = cheerio.load(xml);

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
      const shareables = $("Shareable");
      for (let i = 0; i < shareables.length; i++) {
        this.parseShareable(shareables[i], author_id);
      }
    });
  }
}

module.exports = FreeganSeeder;
