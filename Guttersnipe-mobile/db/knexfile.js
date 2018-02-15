module.exports = {
  development: {
    client: 'pg',
    user: 'postgres',
    password: 'postgres',
    connection: 'postgres://postgres:postgres@localhost/guttersnipeKnex',

    migrations: {
      directory: __dirname + '/migrations'
    },
    seeds: {
      directory: __dirname + '/seeds'
    },
    debugger: true,
    debug: true
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URI,
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    }
  }
}
