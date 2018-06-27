DROP FUNCTION IF EXISTS select_or_insert_comment( TEXT, TEXT, uuid, uuid, TIMESTAMP WITH TIME ZONE );
CREATE OR REPLACE FUNCTION SELECT_OR_INSERT_COMMENT(
  c_text     TEXT,
  c_title    TEXT,
  c_shareable_id   uuid,
  c_user_id   uuid,
  c_posted TIMESTAMP WITH TIME ZONE)
  RETURNS uuid
AS $$
DECLARE
  comment_id uuid;
BEGIN
  SELECT id
  INTO comment_id
  FROM shareable_comment
  WHERE shareable_comment."title" = c_title AND
        shareable_comment."shareable_id" = c_shareable_id AND
        shareable_comment."date_posted" = c_posted AND
        shareable_comment."user_id" = c_user_id;


  RAISE NOTICE 'comment id is %', comment_id;

  if (comment_id is null)
  THEN
      RAISE NOTICE 'inserting comment with shareable id %', c_shareable_id;

    INSERT INTO shareable_comment ("title", "shareable_id", "user_id", date_posted, created_on, updated_on)
    VALUES (c_title, c_shareable_id, c_user_id, c_posted, now(), now())
    returning id
      into comment_id;
  end if;
  return comment_id;
end;
$$
LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS select_or_insert_user(TEXT,TEXT,TIMESTAMP WITH TIME ZONE,TEXT);
CREATE OR REPLACE FUNCTION SELECT_OR_INSERT_USER(
  u_email      TEXT,
  u_name       TEXT,
  u_expiration TIMESTAMP WITH TIME ZONE,
  u_role       TEXT)
  RETURNS uuid
AS $$
DECLARE
  user_id uuid;
BEGIN
  SELECT id
  INTO user_id
  FROM guttersnipe_user
  WHERE guttersnipe_user."email" = u_email AND
        guttersnipe_user."name" = u_name AND
        /* guttersnipe_user.u_expiration = expiration AND */
        guttersnipe_user."role" = u_role;

  if (user_id is null)
  THEN
    INSERT INTO guttersnipe_user ("email", "name", "expiration", "role", "created_on", "updated_on")
    VALUES (u_email, u_name, u_expiration, u_role, now(), now())
    returning id
      into user_id;
  end if;
  return user_id;
end;
$$
LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS select_or_insert_shareable( TEXT, TEXT, TEXT, TEXT, DOUBLE PRECISION, DOUBLE PRECISION, TEXT );
DROP FUNCTION IF EXISTS select_or_insert_shareable( TEXT, TEXT, TEXT, TEXT, TEXT, DOUBLE PRECISION, DOUBLE PRECISION );
DROP FUNCTION IF EXISTS SELECT_OR_INSERT_SHAREABLE( TEXT, TEXT, TEXT, TEXT, TEXT, FLOAT, FLOAT );
CREATE OR REPLACE FUNCTION SELECT_OR_INSERT_SHAREABLE(
  s_time TEXT,
  s_subclass       TEXT,
  s_name           TEXT,
  s_description    TEXT,
  s_address        TEXT,
  s_longitude      FLOAT,
  s_latitude       FLOAT)
  RETURNS uuid
AS $$
DECLARE
  shareable_id       uuid;
  shareable_geometry geometry;
  geometry_string    Text;
BEGIN

  geometry_string := 'POINT(' || s_longitude || ' ' || s_latitude || ')';

  SELECT ST_GeomFromText(geometry_string)
  into shareable_geometry;

  SELECT id
  INTO shareable_id
  FROM shareable
  WHERE shareable.subcategory = s_subclass AND
        shareable.name = s_name AND
        shareable.description = s_description AND
        shareable.address = s_address AND
        shareable.time = s_time AND
        shareable.geolocation = shareable_geometry;

  if (shareable_id is null)
  THEN
    INSERT INTO shareable (geolocation, subcategory, name,
                           description, address,
                           time, created_on, updated_on)
    VALUES (shareable_geometry,
            s_subclass, s_name, s_description,
            s_address, s_time, now(), now())
    returning id
      into shareable_id;
  end if;
  return shareable_id;
end;
$$
LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS select_or_insert_kropotkin(TEXT);
CREATE OR REPLACE FUNCTION SELECT_OR_INSERT_KROPOTKIN(
  k_paragraph TEXT)
  RETURNS INT
AS $$
DECLARE
  kropotkin_id INT;
BEGIN
  SELECT id
  INTO kropotkin_id
  FROM kropotkin
  WHERE kropotkin.paragraph = k_paragraph;

  if (kropotkin_id is null)
  THEN
    INSERT INTO kropotkin (paragraph)
    VALUES (k_paragraph)
    returning id
      into kropotkin_id;
  end if;
  return kropotkin_id;
end;
$$
LANGUAGE plpgsql;
/**
TEST BLOCK BELOW
 */


SELECT row_to_json(shareable)
FROM shareable
WHERE shareable.id = (
  SELECT id
  FROM shareable
  WHERE shareable.name = 'Gristedes');

SELECT json_agg(shareable)
FROM (
       SELECT
         id,
         NAME,
         description,
         address,
         TIME,
         icalendar
       FROM shareable)
  AS shareable;

SELECT json_agg(shareable_comment)
FROM (
       SELECT
         gu.id AS authorId,
         gu.name AS authorName,
         gu.role AS authorRole,

         sc.id AS commentId,
         sc.title AS commentTitle,
         sc.text AS commentText,
         sc.date_posted AS datePosted,
         sc.shareable_id AS shareableId

       FROM shareable_comment sc
         INNER JOIN guttersnipe_user gu
           ON sc.user_id = gu.id
       WHERE sc.shareable_id = (
         SELECT id
         FROM shareable s
         WHERE s.name = 'Gristedes'))
  AS shareable_comment;


SELECT SELECT_OR_INSERT_SHAREABLE(s_time := 'bluetzot',
                                  s_subclass := 'foo',
                                  s_name := 'moo',
                                  s_description := 'moo',
                                  s_address := 'moo',
                                  s_longitude := 40.0,
                                  s_latitude := 40.0);

SELECT SELECT_OR_INSERT_USER(u_email := 'mitchell.verter@gmail.com',
                             u_name := 'mitchell',
                             u_expiration := NULL,
                             u_role := 'superadmin');

SELECT SELECT_OR_INSERT_COMMENT(
              c_text := 'kosher%20supermarket',
              c_title := 'kosher%20supermarket',
              c_shareable_id := (select id from shareable where name='moo'),
              c_user_id := (select id from guttersnipe_user where name='mitchell'),
              c_posted := '2012-03-06 11:22:23-05:00');
