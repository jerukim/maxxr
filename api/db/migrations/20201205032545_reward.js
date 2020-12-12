const quarters = [1, 2, 3, 4]

exports.up = async function (knex) {
    await knex.schema.createTable('reward', (table) => {
        table.increments()

        table.decimal('rate', 2, 1)
            .notNullable()

        table.enum('active_quarter', quarters)

        table.date('expires_at')

        table.string('expires_in')

        table.integer('card_id')
        table.foreign('card_id')
            .references('card.id')

        table.integer('category_id')
        table.foreign('category_id')
            .references('category.id')

        table.integer('subcategory_id')
        table.foreign('subcategory_id')
            .references('subcategory.id')
    })
}

exports.down = async function (knex) {
    await knex.schema.dropTable('reward')
}