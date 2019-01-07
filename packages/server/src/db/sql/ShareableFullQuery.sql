SELECT json_agg(shareable)
FROM (
       SELECT
         id,
         subcategory,
         (
           SELECT category
           FROM category_subcategory cs
           WHERE cs.subcategory = subcategory
         ),
         "name",
         description,
         address,
         "time",
         geolocation,
         icalendar,
         longitude,
         latitude
       FROM shareable
         WHERE shareable.id = $1)
  AS shareable;
