const dbConfig = {
  'dev': {
    user: 'postgres',
    host: 'localhost',
    database: 'guttersnipeSimple',
    password: 'postgres',
    port: 5432,
  },
  'test': {
    user: 'postgres',
    host: 'localhost',
    database: 'guttersnipeTest',
    password: 'postgres',
    port: 5432,
  }
}
module.exports = dbConfig;
