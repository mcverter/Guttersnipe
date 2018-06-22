select json_agg(category)
FROM (
       SELECT category from category_subcategory
       WHERE subcategory=$1)
as category;