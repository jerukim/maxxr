exports.up = async function (knex) {
    await knex.schema.createTable('category', (table) => {
        table.increments()

        table.string('name')
            .notNullable()
            .index()
    })
}

exports.down = async function (knex) {
    await knex.schema.dropTable('category')
}