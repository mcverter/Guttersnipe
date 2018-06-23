CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION if not exists "postgis";
/*CREATE EXTENSION if not exists "plv8";*/

DROP TABLE IF EXISTS shareable CASCADE;
CREATE TABLE shareable
(
  id            uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  subcategory    TEXT,
  name        TEXT,
  description TEXT,
  address     TEXT,
  geolocation geometry,
  time        TEXT,
  icalendar        TEXT, /* https://tools.ietf.org/html/rfc5545 */
  created_on    TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_on    TIMESTAMP WITH TIME ZONE NOT NULL
);

DROP TABLE IF EXISTS kropotkin CASCADE;
CREATE TABLE kropotkin
(
  id          SERIAL PRIMARY KEY,
  paragraph TEXT
);

DROP TABLE IF EXISTS guttersnipe_user CASCADE;
CREATE TABLE guttersnipe_user
(
  id           uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  email      TEXT ,
  name       TEXT,
  expiration TIMESTAMP WITH TIME ZONE,
  role       TEXT,
  created_on   TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_on   TIMESTAMP WITH TIME ZONE NOT NULL
);

DROP TABLE IF EXISTS shareable_comment CASCADE;
CREATE TABLE shareable_comment
(
  id           uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  title        TEXT,
  text TEXT,
  shareable_id uuid REFERENCES shareable (id),
  user_id      uuid REFERENCES guttersnipe_user (id),
  
  /* date_posted is probably redundant with created_on */
  date_posted  TIMESTAMP WITH TIME ZONE NOT NULL,
  created_on   TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_on   TIMESTAMP WITH TIME ZONE NOT NULL
);

DROP TABLE IF EXISTS Category_Subcategory;
create TABLE Category_Subcategory (
  category  TEXT,
  subcategory TEXT
);