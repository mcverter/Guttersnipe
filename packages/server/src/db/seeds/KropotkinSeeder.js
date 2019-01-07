const kropotkinData = require("./kropotkinData");

const seedKropotkins = (client) => {
  kropotkinData.forEach(kropotkin => {
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
