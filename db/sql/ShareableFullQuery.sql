SELECT json_agg(shareable)
FROM (
       SELECT
         id,
         s_subcategory AS subcategory,
         (
           SELECT category
           FROM category_subcategory cs
           WHERE cs.subcategory = s_subcategory
         ),
         s_name AS NAME,
         s_description AS description,
         s_address AS address,
         s_time AS TIME,
         s_geolocation AS geolocation,
         s_ical AS icalendar
       FROM shareable
         WHERE shareable.s_name = 'Gristedes')
  AS shareable;
