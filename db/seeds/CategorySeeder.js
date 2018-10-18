const { Client } = require("pg");

const defaultClient = new Client({
  user: "postgres",
  host: "localhost",
  database: "guttersnipeTest",
  password: "postgres",
  port: 5432
});

const categoriesToSubcategories = {
  food: ["dumpster", "food not bombs", "free meal", "food pantry"],
  medical: ["needle exchange", "free clinic (western)"],
  shelter: ["squat", "abandoned building", "infoshop"]
};

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
          SELECT SELECT_OR_INSERT_category_subcategory(
           cat := '${category}', 
           subcat := '${subcategory}'
          );`;
        this.client.query(insertCategoryQuery);
      });
    }
  }
}

module.exports = CategorySeeder;
