const gsnipeJSON = require(__dirname +
  "/../data/json/older/01_guttersnipeOld.json");
const kropotkins = gsnipeJSON.find(el => el.name === "kropotkin").records;

const seedKropotkins = (client) => {
  kropotkins.forEach(kropotkin => {
    let kropotkinInsertStatement = `
          SELECT SELECT_OR_INSERT_KROPOTKIN(
            k_paragraph := '${kropotkin.paragraph}');
            `;
    client
      .query(kropotkinInsertStatement)
      .then(shareable_response => {})
      .catch(error => {
        console.error("KROPOTKIN INSERT ERROR:", error);
      });
  });
};

module.exports = {seedKropotkins};
