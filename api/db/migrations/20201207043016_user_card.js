exports.up = async function (knex) {
    await knex.schema.createTable('user_card', (table) => {
        table.integer('user_id')
            .index()
        table.foreign('user_id')
            .references('user.id')

        table.integer('card_id')
        table.foreign('card_id')
            .references('card.id')

        table.unique(['user_id', 'card_id'])

        table.timestamp('approved_on')
            .defaultTo(knex.fn.now())
            .notNullable()
    })
}

exports.down = async function (knex) {
    await knex.schema.dropTable('user_card')
}