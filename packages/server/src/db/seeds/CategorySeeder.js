const categoriesToSubcategories = {
  food: ["dumpster", "food not bombs", "free meal", "food pantry"],
  medical: ["needle exchange", "free clinic (western)"],
  shelter: ["squat", "abandoned building", "infoshop"]
};


const seedCategories = (client) => {
  for (let category in categoriesToSubcategories) {
    categoriesToSubcategories[category].forEach(subcategory => {
      let insertCategoryQuery = `
          SELECT SELECT_OR_INSERT_category_subcategory(
           cat := '${category}', 
           subcat := '${subcategory}'
          );`;
      client.query(insertCategoryQuery);
    });
  }
};

module.exports = {seedCategories};
