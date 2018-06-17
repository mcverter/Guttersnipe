CREATE OR REPLACE FUNCTION get_sum(
  a NUMERIC,
  b NUMERIC)
  RETURNS NUMERIC AS $$
BEGIN
  RETURN a + b;
END; $$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION TEST_ARGUMENT_LIST(
  subclass    TEXT,
  name        TEXT,
  description TEXT,
  address     TEXT,
  longitude   FLOAT,
  latitude    FLOAT,
  s_time      TEXT)
  RETURNS NUMERIC AS $$
BEGIN
  RETURN 5;

end;

$$
LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS insert_shareable(text, text, text, text, double precision, double precision, text );
DROP FUNCTION if exists insert_shareable(text,text,text,text,text,double precision,double precision);



CREATE OR REPLACE FUNCTION INSERT_SHAREABLE(
  shareable_time TEXT,
  subclass       TEXT,
  name           TEXT,
  description    TEXT,
  address        TEXT,
  longitude      FLOAT,
  latitude       FLOAT)
  RETURNS uuid
AS $$
DECLARE
  shareable_id uuid;
BEGIN
  SELECT id INTO shareable_id
                FROM shareable
                WHERE shareable.s_subclass = subclass AND
                      shareable.s_name = name AND
                      shareable.s_description = description AND
                      shareable.s_address = address AND
                      shareable.s_time = shareable_time AND
                      1 = 1;

  RAISE notice 'done select into';

  if (shareable_id is null)
    THEN
    INSERT INTO shareable (s_subclass, s_name,
                           s_description, s_address,
                          s_time, created_on, updated_on)
    VALUES (subclass, name, description,
            address, shareable_time, now(), now())
    returning id into shareable_id;
  end if;
  return shareable_id;

  /*            shareable.s_geolocation
              = ST_GeomFromText('50.0, 50.0', 4326)

  */

end;
$$
LANGUAGE plpgsql;

SELECT get_sum(a := 10, b := 20);
SELECT insert_shareable(shareable_time := 'bluetzo', subclass := 'foo', name := 'moo', description := 'moo', address := 'moo', longitude := 40.0, latitude := 40.0);
