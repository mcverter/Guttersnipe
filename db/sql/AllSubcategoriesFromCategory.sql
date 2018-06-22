select json_agg(subcategories)
FROM (
       SELECT subcategory from category_subcategory
       where category=$1
     )
as subcategories;