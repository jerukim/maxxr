exports.up = async function (knex) {
    await knex.schema.createTable('card', (table) => {
        table.increments()

        table.string('name')
            .notNullable()
            .index()

        table.integer('issuer_id')
        table.foreign('issuer_id')
            .references('issuer.id')

        table.integer('network_id')
        table.foreign('network_id')
            .references('network.id')

        table.integer('reward_type_id')
        table.foreign('reward_type_id')
            .references('reward_type.id')

        // table.decimal('annual_fee')

        // table.decimal('foreign_fee', 2, 1)
    })
}

exports.down = async function (knex) {
    await knex.schema.dropTable('card')
}