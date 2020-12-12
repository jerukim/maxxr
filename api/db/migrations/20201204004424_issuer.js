exports.up = async function (knex) {
    await knex.schema.createTable('issuer', (table) => {
        table.increments()

        table.string('name')
            .notNullable()
    })
}

exports.down = async function (knex) {
    await knex.schema.dropTable('issuer')
}