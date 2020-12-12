require('ts-node/register')

const knexConfig = {

  development: {
    client: 'pg',
    connection: {
      database: 'maxxr',
      host: 'localhost'
    },
    migrations: {
      directory: __dirname + '/src/db/migrations',
    },
    seeds: {
      directory: __dirname + '/src/db/seeds',
    }
  },

  staging: {
    client: 'pg',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

}

module.exports = knexConfig

// export default knexConfig