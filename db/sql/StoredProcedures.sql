CREATE OR REPLACE FUNCTION INSERT_SHAREABLE(
  subclass TEXT,
  s_name TEXT,
  description TEXT,
  address  TEXT,
  longitude FLOAT,
  latitude FLOAT ,
  s_time TEXT)
  RETURNS INT
  AS $$
  BEGIN
    IF NOT EXISTS(
      SELECT id FROM shareable
      WHERE subclass = subclass AND
            s_name = s_name AND
            description = description AND
            address = address AND
            s_time = s_time AND
            geolocation = st.geomFromText(
                'Point(${latitude} ${longitude})', 4326))
    THEN
      INSERT INTO shareable(subclass,  s_name,
                            description, address,
                            longitude, latitude, s_time)
        VALUES (subclass, s_name, description,
                address, longitude, latitude, s_time)
      RETURNING id;
    ELSE
      SELECT id FROM shareable
      WHERE subclass = subclass AND
            s_name = s_name AND
            description = description AND
            address = address AND
            s_time = s_time AND
            geolocation = st.geomFromText(
                'Point(${latitude} ${longitude})', 4326);
    end if;
  end;
  $$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION INSERT_USER (

) RETURNS INT
  AS $$
  BEGIN
    IF NOT EXISTS(
      SELECT id from shareable_users
      WHERE (1=1))
    THEN
      INSERT INTO shareable_users
      ELSE

    end if;
    )
  END;
$$


