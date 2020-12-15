import * as Knex from "knex"

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('subcategory', (table) => {
        table.increments()

        table.string('name')
            .notNullable()
            .index()
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('subcategory')
}