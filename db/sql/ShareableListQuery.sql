select json_agg(shareable)
FROM (
       SELECT
         id,
         subcategory as subcategory,
         (
           select category
           from category_subcategory cs
           where cs.subcategory = subcategory
         ),
         name as name,
         description as description,
         address as address,
         time as time,
         geolocation as geolocation,
         icalendar as icalendar
       FROM shareable)
  as shareable;
