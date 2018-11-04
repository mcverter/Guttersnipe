const dbConfig = {
  dev: {
    user: "postgres",
    host: "localhost",
    database: "guttersnipeTest",
    password: "postgres",
    port: 5432
  },
  test: {
    user: "postgres",
    host: "localhost",
    database: "guttersnipeTest",
    password: "postgres",
    port: 5432
  },
  production: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
};
module.exports = dbConfig;
