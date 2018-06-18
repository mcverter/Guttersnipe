CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION if not exists "postgis";
/*CREATE EXTENSION if not exists "plv8";*/

DROP TABLE IF EXISTS shareable CASCADE;
CREATE TABLE shareable
(
  id            uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  s_subclass    TEXT,
  s_name        TEXT,
  s_description TEXT,
  s_address     TEXT,
  s_geolocation geometry,
  s_time        TEXT,
  created_on    TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_on    TIMESTAMP WITH TIME ZONE NOT NULL
);

DROP TABLE IF EXISTS kropotkin CASCADE;
CREATE TABLE kropotkin
(
  id          SERIAL PRIMARY KEY,
  k_paragraph TEXT
);

DROP TABLE IF EXISTS guttersnipe_user CASCADE;
CREATE TABLE guttersnipe_user
(
  id           uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  u_email      TEXT,
  u_name       TEXT,
  u_expiration TIMESTAMP WITH TIME ZONE,
  u_role       TEXT,
  created_on   TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_on   TIMESTAMP WITH TIME ZONE NOT NULL
);

DROP TABLE IF EXISTS shareable_comment CASCADE;
CREATE TABLE shareable_comment
(
  id           uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  title        TEXT,
  comment_text TEXT,
  shareable_id uuid REFERENCES shareable (id),
  user_id      uuid REFERENCES guttersnipe_user (id),
  date_posted  TIMESTAMP WITH TIME ZONE NOT NULL,
  created_on   TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_on   TIMESTAMP WITH TIME ZONE NOT NULL
);
