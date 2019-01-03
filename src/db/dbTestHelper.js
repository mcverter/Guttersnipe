const fs = require('fs');
const {Client} = require('pg');
const FreeganSeeder = require('./seeds/FreeganSeeder');
const KropotkinSeeder = require('./seeds/KropotkinSeeder');
const CategorySeeder = require('./seeds/CategorySeeder');


const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'guttersnipeTest',
  password: 'postgres',
  port: 5432,
});

client.connect();

// create database

const createDatabaseSQL = fs.readFileSync(__dirname + '/../../db/sql/CreateTables.sql', 'utf8');
client.query(createDatabaseSQL)

// run stored procedures
const createStoredProceduresSQL = fs.readFileSync(__dirname + '/../../db/sql/StoredProcedures.sql', 'utf8');
client.query(createStoredProceduresSQL)

// populate database
const fseeder = new FreeganSeeder(client);
const kseeder = new KropotkinSeeder(client);
const cseeder = new CategorySeeder(client);
fseeder.seedFreegans();
kseeder.seedKropotkins();
cseeder.seedCategories();


module.exports = {client};
