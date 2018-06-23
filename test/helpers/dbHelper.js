const fs = require('fs');
const {Client} = require('pg');
const FreeganSeeder = require('../../db/seeds/01_SeedFreegans');

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
const fseeder = new FreeganSeeder();
fseeder.seedFreegans();


