import pg from 'pg'
pg.types.setTypeParser(1700, 'text', parseFloat)

import Knex from 'knex'

const config = {
    client: 'pg',
    connection: {
        database: 'maxxr',
        host: 'localhost'
    }
}
const db = Knex(config)

export default db