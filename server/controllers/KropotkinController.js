const Promise = require('bluebird');
const knex = require(__dirname + '/../../config/knex');

class KropotkinController {
  selectRandomRecord() {
    const kropotkinQuery =`
       SELECT k_paragraph
       FROM kropotkin
       OFFSET floor(random() * (select count(*)
                           from kropotkin))
       LIMIT 1;
`;
    return knex.raw(kropotkinQuery);
  }
}

module.exports = KropotkinController;
