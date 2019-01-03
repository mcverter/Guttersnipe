const cheerio = require("cheerio");
const fs = require("fs");
const moment = require("moment");
require("pg-escape");

class inputParser {
  parseShareablesList() {}
  parseShareable() {}
  parseComment() {}
}

function superescape(value) {
  return typeof value !== "string"
    ? value
    : escape(value.trim().replace(/\s+/g, " "));
}

class XMLInputParser {
  parseShareablesList() {
    const fileContents = fs.readFileSync(
      __dirname + "/../data/html/BrooklynDirectory.xml.html",
      "utf8"
    );
    const frontMarkerString = `const Content = () => (`;
    let xml = fileContents.substring(fileContents.indexOf(frontMarkerString));
    xml = xml.substring(frontMarkerString.length, xml.indexOf(");"));
    let $ = cheerio.load(xml);
    return $("Shareable");
  }

  parseShareable(shareable) {
    let $ = cheerio.load(shareable);
    return {
      subclass: escape("dumpster"),
      name: superescape($("Name").text()),
      description: superescape($("Description").text()),
      // space
      address: superescape($("Address").text()),
      longitude: $("Longitude").text(),
      latitude: $("Latitude").text(),
      // time
      time: superescape($("Time").text()),
      // Comments
      comments: $("Comment"),
      author: $("Author").text()
    };
  }

  parseComment(comments, i) {
    let $comment = cheerio.load(comments[i]);
    let title, text;
    if ($comment("CommentTitle").text()) {
      title = superescape($comment("CommentTitle").text());
      text = superescape($comment("CommentText").text());
    } else {
      text = superescape($comment.text());
      title = text.substring(0, 20);
    }
    return { text, title };
  }
}

class JSONInputParser {
  parseShareablesList() {
    const fileContents = fs.readFileSync(
      __dirname + "/../scripts/node/geocodedShareables.json"
    );
    return JSON.parse(fileContents);
  }
  parseShareable(shareable) {
    Object.keys(shareable).forEach(key => {
      shareable[key] = superescape(shareable[key]);
    });
    return shareable;
  }
  parseComment(comments, i) {
    return { text: superescape(comments[i]) };
  }
}

module.exports = { JSONInputParser, XMLInputParser };
