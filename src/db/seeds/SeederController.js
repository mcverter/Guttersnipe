// connect db
const { Client } = require("pg");
require('dotenv').config();
let client = new Client({connectionString: process.env.DATABASE_URL});
client.connect();

const {seedFreegans} = require("./FreeganSeeder");
const {seedKropotkins} = require("./KropotkinSeeder");
const {seedCategories} = require("./CategorySeeder");

// populate database
seedFreegans(client);
seedKropotkins(client);
seedCategories(client);
