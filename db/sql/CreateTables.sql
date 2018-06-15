CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION if not exists "postgis";

DROP TABLE  IF EXISTS shareable;
CREATE TABLE shareable
(
  id uuid DEFAULT uuid_generate_v4( ) PRIMARY KEY,
  subclass TEXT,
  shareable_name TEXT,
  description TEXT,
  address TEXT,
  geolocation geometry,
  shareable_time TEXT,
  created_on TIMESTAMP NOT NULL,
  updated_on TIMESTAMP NOT NULL
);

DROP TABLE  IF EXISTS kropotkin;
CREATE TABLE kropotkin
(
  id uuid DEFAULT uuid_generate_v4( ) PRIMARY KEY,
  paragraph TEXT
);

DROP TABLE IF EXISTS guttersnipe_user;
CREATE TABLE guttersnipe_user
(
  id uuid DEFAULT uuid_generate_v4( ) PRIMARY KEY,
  email TEXT,
  user_name TEXT
, expiration_date TIMESTAMP,
  user_role TEXT
);

DROP TABLE IF EXISTS shareable_comment;
CREATE TABLE shareable_comment
(
id uuid DEFAULT uuid_generate_v4( ) PRIMARY KEY
, title TEXT
, comment_text TEXT
, shareable_id uuid REFERENCES shareable(id)
, user_id uuid  REFERENCES guttersnipe_user(id)
);