SELECT json_agg(shareable)
FROM (
       SELECT
         id,
         subcategory AS subcategory,
         (
           SELECT category
           FROM category_subcategory cs
           WHERE cs.subcategory = subcategory
         ),
         name AS NAME,
         description AS description,
         address AS address,
         time AS TIME,
         geolocation AS geolocation,
         icalendar AS icalendar
       FROM shareable
         WHERE shareable.id = $1)
  AS shareable;
