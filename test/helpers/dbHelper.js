const fs = require('fs');
const {Client} = require('pg')

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'guttersnipeSimple',
  password: 'postgres',
  port: 5432,
});

client.connect();
