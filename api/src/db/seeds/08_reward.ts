import * as Knex from "knex"

export async function seed(knex: Knex): Promise<void> {
  await knex('reward').del()

  const rewards = [
    // chase sapphire preffered 1x everything else
    {
      id: 1,
      card_id: 1,
      rate: 1,
      active_quarter: null,
      expires_at: null,
      expires_in: null,
      category_id: null,
      subcategory_id: null
    },
    // chase sapphire preffered 2x dining
    {
      id: 2,
      card_id: 1,
      rate: 2,
      active_quarter: null,
      expires_at: null,
      expires_in: null,
      category_id: 1,
      subcategory_id: null
    },
    // chase sapphire preffered 2x travel
    {
      id: 3,
      card_id: 1,
      rate: 2,
      active_quarter: null,
      expires_at: null,
      expires_in: null,
      category_id: 2,
      subcategory_id: null
    },
    // chase sapphire preffered 2x grocery
    {
      id: 4,
      card_id: 1,
      rate: 2,
      active_quarter: null,
      expires_at: '2021-04-30',
      expires_in: null,
      category_id: 2,
      subcategory_id: null
    },

    // chase freedom unlimited everything else
    {
      id: 5,
      card_id: 2,
      rate: 1.5,
      active_quarter: null,
      expires_at: null,
      expires_in: null,
      category_id: null,
      subcategory_id: null
    },
    // chase freedom unlimited 5% grocery for 1 year
    {
      id: 6,
      card_id: 2,
      rate: 5,
      active_quarter: null,
      expires_at: null,
      expires_in: '1 year',
      category_id: 3,
      subcategory_id: null
    },
    // chase freedom unlimited 3% dining
    {
      id: 7,
      card_id: 2,
      rate: 3,
      active_quarter: null,
      expires_at: null,
      expires_in: null,
      category_id: 1,
      subcategory_id: null
    },
    // chase freedom unlimited 3% drugstore
    {
      id: 43,
      card_id: 2,
      rate: 1.5,
      active_quarter: null,
      expires_at: null,
      expires_in: null,
      category_id: 4,
      subcategory_id: null
    },
    // chase freedom unlimited 5% travel through CUR
    {
      id: 8,
      card_id: 2,
      rate: 1.5,
      active_quarter: null,
      expires_at: null,
      expires_in: null,
      category_id: 2,
      subcategory_id: 1
    },

    // discover it 1% everything else
    {
      id: 9,
      card_id: 3,
      rate: 1,
      active_quarter: null,
      expires_at: null,
      expires_in: null,
      category_id: null,
      subcategory_id: null
    },
    // discover it 5% q1 grocery
    {
      id: 10,
      card_id: 3,
      rate: 5,
      active_quarter: 1,
      expires_at: null,
      expires_in: null,
      category_id: 3,
      subcategory_id: null
    },
    // discover it 5% q1 cvs
    {
      id: 11,
      card_id: 3,
      rate: 5,
      active_quarter: 1,
      expires_at: null,
      expires_in: null,
      category_id: 4,
      subcategory_id: 2
    },
    // discover it 5% q1 walgreens
    {
      id: 12,
      card_id: 3,
      rate: 5,
      active_quarter: 1,
      expires_at: null,
      expires_in: null,
      category_id: 4,
      subcategory_id: 3
    },
    // discover it 5% q2 gas station
    {
      id: 13,
      card_id: 3,
      rate: 5,
      active_quarter: 2,
      expires_at: null,
      expires_in: null,
      category_id: 5,
      subcategory_id: null
    },
    // discover it 5% q2 wholesale club
    {
      id: 14,
      card_id: 3,
      rate: 5,
      active_quarter: 2,
      expires_at: null,
      expires_in: null,
      category_id: 6,
      subcategory_id: null
    },
    // discover it 5% q2 streaming service
    {
      id: 15,
      card_id: 3,
      rate: 5,
      active_quarter: 2,
      expires_at: null,
      expires_in: null,
      category_id: 7,
      subcategory_id: 4
    },
    {
      id: 16,
      card_id: 3,
      rate: 5,
      active_quarter: 2,
      expires_at: null,
      expires_in: null,
      category_id: 7,
      subcategory_id: 5
    },
    {
      id: 17,
      card_id: 3,
      rate: 5,
      active_quarter: 2,
      expires_at: null,
      expires_in: null,
      category_id: 7,
      subcategory_id: 6
    },
    {
      id: 18,
      card_id: 3,
      rate: 5,
      active_quarter: 2,
      expires_at: null,
      expires_in: null,
      category_id: 7,
      subcategory_id: 7
    },
    {
      id: 19,
      card_id: 3,
      rate: 5,
      active_quarter: 2,
      expires_at: null,
      expires_in: null,
      category_id: 7,
      subcategory_id: 8
    },
    {
      id: 20,
      card_id: 3,
      rate: 5,
      active_quarter: 2,
      expires_at: null,
      expires_in: null,
      category_id: 7,
      subcategory_id: 9
    },
    {
      id: 21,
      card_id: 3,
      rate: 5,
      active_quarter: 2,
      expires_at: null,
      expires_in: null,
      category_id: 7,
      subcategory_id: 10
    },
    {
      id: 22,
      card_id: 3,
      rate: 5,
      active_quarter: 2,
      expires_at: null,
      expires_in: null,
      category_id: 7,
      subcategory_id: 11
    },
    {
      id: 23,
      card_id: 3,
      rate: 5,
      active_quarter: 2,
      expires_at: null,
      expires_in: null,
      category_id: 7,
      subcategory_id: 12
    },
    {
      id: 24,
      card_id: 3,
      rate: 5,
      active_quarter: 2,
      expires_at: null,
      expires_in: null,
      category_id: 7,
      subcategory_id: 13
    },
    {
      id: 25,
      card_id: 3,
      rate: 5,
      active_quarter: 2,
      expires_at: null,
      expires_in: null,
      category_id: 7,
      subcategory_id: 14
    },
    {
      id: 26,
      card_id: 3,
      rate: 5,
      active_quarter: 2,
      expires_at: null,
      expires_in: null,
      category_id: 7,
      subcategory_id: 15
    },
    {
      id: 27,
      card_id: 3,
      rate: 5,
      active_quarter: 2,
      expires_at: null,
      expires_in: null,
      category_id: 7,
      subcategory_id: 16
    },
    {
      id: 28,
      card_id: 3,
      rate: 5,
      active_quarter: 2,
      expires_at: null,
      expires_in: null,
      category_id: 7,
      subcategory_id: 17
    },
    {
      id: 29,
      card_id: 3,
      rate: 5,
      active_quarter: 2,
      expires_at: null,
      expires_in: null,
      category_id: 7,
      subcategory_id: 18
    },
    {
      id: 30,
      card_id: 3,
      rate: 5,
      active_quarter: 2,
      expires_at: null,
      expires_in: null,
      category_id: 7,
      subcategory_id: 19
    },
    {
      id: 31,
      card_id: 3,
      rate: 5,
      active_quarter: 2,
      expires_at: null,
      expires_in: null,
      category_id: 7,
      subcategory_id: 20
    },
    {
      id: 32,
      card_id: 3,
      rate: 5,
      active_quarter: 2,
      expires_at: null,
      expires_in: null,
      category_id: 7,
      subcategory_id: 21
    },
    {
      id: 33,
      card_id: 3,
      rate: 5,
      active_quarter: 2,
      expires_at: null,
      expires_in: null,
      category_id: 7,
      subcategory_id: 22
    },
    {
      id: 34,
      card_id: 3,
      rate: 5,
      active_quarter: 2,
      expires_at: null,
      expires_in: null,
      category_id: 7,
      subcategory_id: 23
    },
    {
      id: 35,
      card_id: 3,
      rate: 5,
      active_quarter: 2,
      expires_at: null,
      expires_in: null,
      category_id: 7,
      subcategory_id: 24
    },
    {
      id: 36,
      card_id: 3,
      rate: 5,
      active_quarter: 2,
      expires_at: null,
      expires_in: null,
      category_id: 7,
      subcategory_id: 25
    },
    {
      id: 37,
      card_id: 3,
      rate: 5,
      active_quarter: 2,
      expires_at: null,
      expires_in: null,
      category_id: 7,
      subcategory_id: 26
    },
    // discover it 5% q3 restaurants
    {
      id: 38,
      card_id: 3,
      rate: 5,
      active_quarter: 3,
      expires_at: null,
      expires_in: null,
      category_id: 1,
      subcategory_id: null
    },
    // discover it 5% q3 paypal
    {
      id: 39,
      card_id: 3,
      rate: 5,
      active_quarter: 3,
      expires_at: null,
      expires_in: null,
      category_id: 8,
      subcategory_id: 27
    },
    // discover it 5% q4 amazon, walmart, target, bestbuy
    {
      id: 40,
      card_id: 3,
      rate: 5,
      active_quarter: 4,
      expires_at: null,
      expires_in: null,
      category_id: 8,
      subcategory_id: 28
    },
    {
      id: 41,
      card_id: 3,
      rate: 5,
      active_quarter: 4,
      expires_at: null,
      expires_in: null,
      category_id: 8,
      subcategory_id: 29
    },
    {
      id: 42,
      card_id: 3,
      rate: 5,
      active_quarter: 4,
      expires_at: null,
      expires_in: null,
      category_id: 8,
      subcategory_id: 30
    },
    {
      id: 44,
      card_id: 3,
      rate: 5,
      active_quarter: 4,
      expires_at: '2020-12-31',
      expires_in: null,
      category_id: null,
      subcategory_id: 31
    },
  ]

  await knex('reward').insert(rewards)
}