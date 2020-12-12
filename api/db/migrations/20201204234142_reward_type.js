exports.up = async function (knex) {
    await knex.schema.createTable('reward_type', (table) => {
        table.increments()

        table.string('name')
            .notNullable()
    })
}

exports.down = async function (knex) {
    await knex.schema.dropTable('reward_type')
}