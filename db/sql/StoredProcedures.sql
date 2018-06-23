DROP FUNCTION IF EXISTS select_or_insert_comment( text, text, uuid, uuid, timestamp with time zone );


CREATE OR REPLACE FUNCTION SELECT_OR_INSERT_COMMENT(
  text     TEXT,
  title    TEXT,
  shareable_id   uuid,
  user_id   uuid,
  posted TIMESTAMP WITH TIME ZONE)
  RETURNS uuid
AS $$
DECLARE
  comment_id uuid;
BEGIN
  SELECT id
  INTO comment_id
  FROM shareable_comment
  WHERE shareable_comment.text = text AND
        shareable_comment.title = title AND
        shareable_comment.shareable_id = shareable_id AND
        shareable_comment.date_posted = posted AND
        shareable_comment.user_id = user_id;


  if (comment_id is null)
  THEN
    INSERT INTO shareable_comment (text, title, shareable_id, user_id, date_posted, created_on, updated_on)
    VALUES (text,
            title, shareable_id, user_id, posted, now(), now())
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
  WHERE guttersnipe_user.email = email AND
        guttersnipe_user.name = name AND
        /* guttersnipe_user.u_expiration = expiration AND */
        guttersnipe_user.role = role;

  if (user_id is null)
  THEN
    INSERT INTO guttersnipe_user (email, name, expiration, role, created_on, updated_on)
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
  WHERE shareable.subcategory = subclass AND
        shareable.name = name AND
        shareable.description = description AND
        shareable.address = address AND
        shareable.time = shareable_time AND
        shareable.geolocation = shareable_geometry;

  if (shareable_id is null)
  THEN
    INSERT INTO shareable (geolocation, subcategory, name,
                           description, address,
                           time, created_on, updated_on)
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
  paragraph TEXT)
  RETURNS INT
AS $$
DECLARE
  kropotkin_id INT;
BEGIN
  SELECT id
  INTO kropotkin_id
  FROM kropotkin
  WHERE kropotkin.k_paragraph = paragraph;

  if (kropotkin_id is null)
  THEN
    INSERT INTO kropotkin (k_paragraph)
    VALUES (paragraph)
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


select row_to_json(shareable)
from shareable
where shareable.id = (
  SELECT id
  from shareable
  where shareable.name = 'Gristedes');

select json_agg(shareable)
FROM (
       SELECT
         id,
         name,
         description,
         address,
         time,
         icalendar
       FROM shareable)
  as shareable;

select json_agg(shareable_comment)
from (
       select
         gu.id as authorId,
         gu.name as authorName,
         gu.role as authorRole,

         sc.id as commentId,
         sc.title as commentTitle,
         sc.text as commentText,
         sc.date_posted as datePosted,
         sc.shareable_id as shareableId

       from shareable_comment sc
         inner join guttersnipe_user gu
           on sc.user_id = gu.id
       where sc.shareable_id = (
         SELECT id
         from shareable s
         where s.name = 'Gristedes'))
  as shareable_comment;

SELECT SELECT_OR_INSERT_SHAREABLE(shareable_time := 'bluetzot', subclass := 'foo', name := 'moo', description := 'moo',
                                  address := 'moo', longitude := 40.0, latitude := 40.0);
SELECT SELECT_OR_INSERT_USER(email := 'mitchell.verter@gmail.com', name := 'mitchell', expiration := NULL,
                             role := 'superadmin');
SELECT SELECT_OR_INSERT_COMMENT(
              text := '8%3A45%20when%20all%20the%20employees%20leave%20the%20store.%20Trash%20is%20collected%20between%2010%3A30%20p%20and%2012%3A30a.%20One%20source%20says%20nothing%20is%20out%20on%20Saturdays.',
              title := 'When%20to%20look%3A',
              c_s_id := '091ffbea-c56d-47bc-b9fc-cf0a195f5a73',
              c_u_id := '696ccc09-863b-408c-a1cc-4b359bbd0230',
              c_posted := '2012-03-06 11:22:23-05:00');