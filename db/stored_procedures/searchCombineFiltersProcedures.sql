CREATE OR REPLACE FUNCTION search_shareable_combine_filters(
  longitude FLOAT DEFAULT NULL ,
  latitude FLOAT DEFAULT NULL ,
  distance INT DEFAULT NULL ,
  type_name TEXT DEFAULT NULL ,
  subtype_list TEXT DEFAULT NULL ,
  tag_list TEXT DEFAULT NULL ,
  date_input DATE DEFAULT NULL
)
  RETURNS TABLE(id INT) AS
$$
DECLARE
touched BOOLEAN := FALSE ;

BEGIN
  DROP TABLE IF EXISTS results;
  CREATE TEMP TABLE IF NOT EXISTS results(id INT);

  IF type_name IS NOT NULL THEN
    RAISE NOTICE 'Inserting from type';
    touched := TRUE;
    INSERT INTO results
    SELECT (search_by_type(type_name));
  END IF;

  if subtype_list IS NOT NULL THEN
    IF touched = TRUE THEN
      RAISE NOTICE 'intersect with subtype';
      INSERT INTO results
      SELECT (search_by_subtype(subtype_list))
      INTERSECT SELECT results.id FROM results;
    ELSE
      RAISE NOTICE 'Inserting from subtype';
      touched := TRUE;
      INSERT INTO results
      SELECT (search_by_subtype(subtype_list));
    END IF;
  END IF;

  if tag_list IS NOT NULL THEN
    IF touched = TRUE THEN
      RAISE NOTICE 'intersect with tag';
      INSERT INTO results
      SELECT (search_by_tag(tag_list))
      INTERSECT SELECT results.id FROM results;
    ELSE
      RAISE NOTICE 'Inserting from tag';
      touched := TRUE;
      INSERT INTO results
      SELECT (search_by_tag(tag_list));
    END IF;
  END IF;


  IF date_input IS NOT NULL THEN
    IF touched = TRUE THEN
            RAISE NOTICE 'intersect with time';

      INSERT INTO results
      SELECT (search_by_date(date_input))
      INTERSECT SELECT results.id FROM results;
    ELSE
            RAISE NOTICE 'Inserting from time';
      touched := TRUE;
      INSERT INTO results
      SELECT (search_by_date(date_input));
    END IF;
  END IF;

  IF latitude IS NOT NULL AND longitude IS NOT NULL AND distance IS NOT NULL THEN
    IF touched = TRUE THEN
      RAISE NOTICE 'Intersect with space';
      INSERT INTO results
          SELECT (search_from_center(longitude, latitude, distance))
          INTERSECT SELECT results.id FROM results;
    ELSE
      RAISE NOTICE 'Inserting from space';
      touched := TRUE;
      INSERT INTO results
      SELECT (search_from_center(longitude, latitude, distance));
    END IF;
  END IF;
  RETURN QUERY
    SELECT results.id
  FROM results;
END;

$$
LANGUAGE 'plpgsql' VOLATILE ;

