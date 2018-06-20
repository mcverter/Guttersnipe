select json_agg(shareable)
FROM (
       SELECT
         id,
         s_subcategory as subcategory,
         (
           select category
           from category_subcategory cs
           where cs.subcategory = s_subcategory
         ),
         s_name as name,
         s_description as description,
         s_address as address,
         s_time as time,
         s_geolocation as geolocation,
         s_ical as icalendar
       FROM shareable)
  as shareable;
