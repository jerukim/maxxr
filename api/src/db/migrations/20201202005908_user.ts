import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
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

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('user')
}