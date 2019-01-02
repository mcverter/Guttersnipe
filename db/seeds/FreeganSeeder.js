require("pg-escape");
const moment = require("moment");
const { XMLInputParser, JSONInputParser } = require("./parsers");
const XML_MODE = false;

let parser = XML_MODE ? new XMLInputParser() : new JSONInputParser();

function insertShareable(client, shareable, author_id) {
  let {subclass, name, description, address,
    longitude, latitude, time, comments} = parser.parseShareable(shareable);
  const insertShareableQuery = `
    SELECT SELECT_OR_INSERT_SHAREABLE(
      s_time := '${time}', 
      s_subclass := '${subclass}', 
      s_name := '${name}', 
      s_description := '${description}', 
      s_address := '${address}', 
      s_longitude := '${longitude}', 
      s_latitude := '${latitude}');`;
  client
    .query(insertShareableQuery)
    .then(shareable_response => {
      let shareable_id =
        shareable_response.rows[0]["select_or_insert_shareable"];
      let date = moment("06 Mar 2012 21:22:23 +0500").format(
        "YYYY-MM-DD hh:mm:ssZ"
      );
      if (comments) {
        for (let i = 0; i < comments.length; i++) {
          let { title, text } = parser.parseComment(comments, i);
          if (text && !title) {
            title = text.substring(0, 20);
          }
          const insertCommentQuery = `
            SELECT SELECT_OR_INSERT_COMMENT(
              c_text := '${text}', 
              c_title := '${title}', 
              c_shareable_id := '${shareable_id}', 
              c_user_id := '${author_id}', 
              c_posted := '${date}');
              `;
          console.log("comment sql statement", insertCommentQuery);
          client
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
      console.error("error", error);
    });
}

const seedFreegans = (client) => {
  let shareables = parser.parseShareablesList();
  const insertUserQuery = `
        SELECT SELECT_OR_INSERT_USER(
          u_email := 'mitchell.verter@gmail.com',
          u_name := 'mitchell', 
          u_expiration := NULL, 
          u_role := 'superadmin');`;
  client.query(insertUserQuery).then(author_response => {
    console.log(
      "a_response",
      author_response.rows[0]["select_or_insert_user"]
    );
    let author_id = author_response.rows[0]["select_or_insert_user"];
    for (let i = 0; i < shareables.length; i++) {
      insertShareable(client, shareables[i], author_id);
    }
  });
};

module.exports = {seedFreegans};
