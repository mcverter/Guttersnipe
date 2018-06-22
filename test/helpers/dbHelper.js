const fs = require('fs');
const {Client} = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'guttersnipeTest',
  password: 'postgres',
  port: 5432,
});

client.connect();

// create database

const createDatabaseSQL = fs.readFileSync(__dirname + '/../../db/sql/ShareableListQuery.sql', 'utf8');

// run stored procedures
const createStoredProceduresSQL = fs.readFileSync(__dirname + '/../../db/sql/ShareableListQuery.sql', 'utf8');

// populate database
const populateDBScript = fs.readFileSync(__dirname + '/../../db/sql/ShareableListQuery.sql', 'utf8');


