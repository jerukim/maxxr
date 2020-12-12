exports.seed = async function (knex) {
  await knex('card').del()

  let cards = [
    {
      id: 1,
      name: 'Chase Sapphire Preferred',
      reward_type_id: 2,
      issuer_id: 1,
      network_id: 1,
      // annual_fee: 95.0,
      // foreign_fee: 0.0,
    },
    {
      id: 2,
      name: 'Chase Freedom Unlimited',
      reward_type_id: 1,
      issuer_id: 1,
      network_id: 1,
      // annual_fee: 0.0,
      // foreign_fee: 3.0,
    },
    {
      id: 3,
      name: 'Discover it',
      reward_type_id: 2,
      issuer_id: 2,
      network_id: 4,
      // annual_fee: 0.0,
      // foreign_fee: 0.0,
    },
  ]

  await knex('card')
    .insert(cards)
}
