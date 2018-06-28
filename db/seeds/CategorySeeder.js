const {Client} = require('pg');

const defaultClient = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'guttersnipeTest',
  password: 'postgres',
  port: 5432,
});

const categoriesToSubcategories = {
  'food': ['dumpster',],  }

class CategorySeeder {
  constructor(client) {
    if (client) {
      this.client = client;
    } else {
      defaultClient.connect();
      this.client = defaultClient;
    }
  }

  seedCategories() {
    for (let category in categoriesToSubcategories) {
      categoriesToSubcategories[category].forEach(subcategory => {
        let insertCategoryQuery = `
        INSERT INTO category_subcategory (category, subcategory)
        VALUES (${category}, ${subcategory})
    `;
        this.client.query(insertCategoryQuery);
      })
    }
  }
}

module.exports = CategorySeeder;
