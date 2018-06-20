DROP FUNCTION IF EXISTS select_or_insert_comment( text, text, uuid, uuid, timestamp with time zone );


CREATE OR REPLACE FUNCTION SELECT_OR_INSERT_COMMENT(
  text     TEXT,
  title    TEXT,
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
  WHERE shareable_comment.c_text = text AND
        shareable_comment.c_title = title AND
        shareable_comment.c_shareable_id = c_s_id AND
        shareable_comment.c_date_posted = c_posted AND
        shareable_comment.c_user_id = c_u_id;


  if (comment_id is null)
  THEN
    INSERT INTO shareable_comment (c_text, c_title, c_shareable_id, c_user_id, c_date_posted, created_on, updated_on)
    VALUES (text,
            title, c_s_id, c_u_id, c_posted, now(), now())
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
  WHERE shareable.s_subcategory = subclass AND
        shareable.s_name = name AND
        shareable.s_description = description AND
        shareable.s_address = address AND
        shareable.s_time = shareable_time AND
        shareable.s_geolocation = shareable_geometry;

  if (shareable_id is null)
  THEN
    INSERT INTO shareable (s_geolocation, s_subcategory, s_name,
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

select row_to_json(shareable)
from shareable
where shareable.id = (
  SELECT id
  from shareable
  where shareable.s_name = 'Gristedes');

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

select json_agg(shareable_comment)
from (
       select
         gu.id as authorId,
         gu.u_name as authorName,
         gu.u_role as authorRole,

         sc.id as commentId,
         sc.c_title as commentTitle,
         sc.c_text as commentText,
         sc.c_date_posted as datePosted,
         sc.c_shareable_id as shareableId

       from shareable_comment sc
         inner join guttersnipe_user gu
           on sc.c_user_id = gu.id
       where sc.c_shareable_id = (
         SELECT id
         from shareable s
         where s.s_name = 'Gristedes'))
  as shareable_comment;

SELECT SELECT_OR_INSERT_SHAREABLE(shareable_time := 'bluetzot', subclass := 'foo', name := 'moo', description := 'moo',
                                  address := 'moo', longitude := 40.0, latitude := 40.0);
SELECT SELECT_OR_INSERT_USER(email := 'mitchell.verter@gmail.com', name := 'mitchell', expiration := NULL,
                             role := 'superadmin');
