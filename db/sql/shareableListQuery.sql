select json_agg(shareable)
FROM (
       SELECT
         id,
         s_name,
         s_description,
         s_address,
         s_time
       FROM shareable)
  as shareable;
