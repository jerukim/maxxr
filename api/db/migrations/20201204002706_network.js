exports.up = async function (knex) {
    await knex.schema.createTable('network', (table) => {
        table.increments()

        table.string('name')
            .notNullable()
    })
}

exports.down = async function (knex) {
    await knex.schema.dropTable('network')
}
