const { Client } = require("pg");
require('dotenv').config();

const {seedFreegans} = require("./FreeganSeeder");
const {seedKropotkins} = require("./KropotkinSeeder");
const {seedCategories} = require("./CategorySeeder");

let client = process.env.DATABASE_URL
  ? new Client({
      connectionString: process.env.DATABASE_URL
    })
  : new Client({
      user: "postgres",
      host: "localhost",
      database: "guttersnipeTest",
      password: "postgres",
      port: 5432
    });

client.connect();

// populate database
seedFreegans(client);
seedKropotkins(client);
seedCategories(client);
