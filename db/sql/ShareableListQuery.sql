select json_agg(shareable)
FROM (
       SELECT
         id,
         subcategory,
         (
           select category
           from category_subcategory cs
           where cs.subcategory = subcategory
         ),
         "name",
         description,
         address,
         "time",
         geolocation,
         icalendar,
         latitude,
         longitude
       FROM shareable)
  as shareable;
