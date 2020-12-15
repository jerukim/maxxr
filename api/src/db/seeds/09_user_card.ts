import * as Knex from "knex"

export async function seed(knex: Knex): Promise<void> {
  await knex('user_card').del()

  let userCards = [
    { user_id: 1, card_id: 1 },
    { user_id: 1, card_id: 2, approved_on: '2019-06-12' },
    { user_id: 1, card_id: 3, approved_on: '2014-08-18' },
  ]

  await knex('user_card')
    .insert(userCards)
}
