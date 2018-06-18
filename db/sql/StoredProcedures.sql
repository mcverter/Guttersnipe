CREATE OR REPLACE FUNCTION SELECT_OR_INSERT_COMMENT(
  c_text   TEXT,
  c_title  TEXT,
  c_s_id   uuid,
  c_u_id   uuid,
  c_posted TIMESTAMP WITH TIME ZONE)
  RETURNS uuid
AS $$
DECLARE
  comment_id uuid;
BEGIN
  SELECT id
  INTO comment_id
  FROM shareable_comment
  WHERE shareable_comment.comment_text = c_text AND
        shareable_comment.title = c_title AND
        shareable_comment.shareable_id = c_s_id AND
        shareable_comment.date_posted = c_posted AND
        shareable_comment.user_id = c_u_id;


  if (comment_id is null)
  THEN
    INSERT INTO shareable_comment (comment_text, title, shareable_id, user_id, date_posted, created_on, updated_on)
    VALUES (c_text,
            c_title, c_s_id, c_u_id, c_posted, now(), now())
    returning id
      into comment_id;
  end if;
  return comment_id;
end;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION SELECT_OR_INSERT_USER(
  email      TEXT,
  name       TEXT,
  expiration TIMESTAMP WITH TIME ZONE,
  role       TEXT)
  RETURNS uuid
AS $$
DECLARE
  user_id uuid;
BEGIN
  SELECT id
  INTO user_id
  FROM guttersnipe_user
  WHERE guttersnipe_user.u_email = email AND
        guttersnipe_user.u_name = name AND
        /* guttersnipe_user.u_expiration = expiration AND */
        guttersnipe_user.u_role = role;

  if (user_id is null)
  THEN
    INSERT INTO guttersnipe_user (u_email, u_name, u_expiration, u_role, created_on, updated_on)
    VALUES (email, name, expiration, role, now(), now())
    returning id
      into user_id;
  end if;
  return user_id;
end;
$$
LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS insert_shareable( text, text, text, text, double precision, double precision, text );
DROP FUNCTION if exists insert_shareable( text, text, text, text, text, double precision, double precision );
DROP FUNCTION IF EXISTS SELECT_OR_INSERT_SHAREABLE( TEXT, TEXT, TEXT, TEXT, TEXT, FLOAT, FLOAT );
CREATE OR REPLACE FUNCTION SELECT_OR_INSERT_SHAREABLE(
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
  shareable_id       uuid;
  shareable_geometry geometry;
  geometry_string    Text;
BEGIN

  geometry_string := 'POINT(' || longitude || ' ' || latitude || ')';

  SELECT ST_GeomFromText(geometry_string)
  into shareable_geometry;

  SELECT id
  INTO shareable_id
  FROM shareable
  WHERE shareable.s_subclass = subclass AND
        shareable.s_name = name AND
        shareable.s_description = description AND
        shareable.s_address = address AND
        shareable.s_time = shareable_time AND
        shareable.s_geolocation = shareable_geometry;

  if (shareable_id is null)
  THEN
    INSERT INTO shareable (s_geolocation, s_subclass, s_name,
                           s_description, s_address,
                           s_time, created_on, updated_on)
    VALUES (shareable_geometry,
            subclass, name, description,
            address, shareable_time, now(), now())
    returning id
      into shareable_id;
  end if;
  return shareable_id;
end;
$$
LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION SELECT_OR_INSERT_KROPOTKIN(
  paragraph      TEXT)
  RETURNS INT
AS $$
DECLARE
  kropotkin_id INT;
BEGIN
  SELECT id
  INTO kropotkin_id
  FROM kropotkin
  WHERE kropotkin.paragraph = paragraph;

  if (kropotkin_id is null)
  THEN
    INSERT INTO kropotkin (paragraph)
    VALUES (paragraph)
    returning id
      into kropotkin_id;
  end if;
  return kropotkin_id;
end;
$$
LANGUAGE plpgsql;



/*
SELECT SELECT_OR_INSERT_SHAREABLE(shareable_time := 'bluetzot', subclass := 'foo', name := 'moo', description := 'moo',
                                  address := 'moo', longitude := 40.0, latitude := 40.0);
SELECT SELECT_OR_INSERT_USER(email := 'mitchell.verter@gmail.com', name := 'mitchell', expiration := NULL,
                             role := 'superadmin');
*/
