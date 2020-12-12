exports.up = async function (knex) {
    await knex.schema.createTable('user', (table) => {
        table.increments()

        table.string('username', 64)
            .unique()
            .notNullable()
            .index()

        table.string('password')
            .notNullable()

        table.string('token')

        table.timestamps(true, true)
    })
}

exports.down = async function (knex) {
    await knex.schema.dropTable('user')
}