select json_agg(record)
FROM (
  SELECT * FROM category_subcategory)
as record;
