select json_agg(category)
FROM (

  SELECT DISTINCT category FROM category_subcategory)
as category;