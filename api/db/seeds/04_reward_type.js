exports.seed = async function (knex) {
  await knex('reward_type').del()

  const rewardTypes = [
    { id: 1, name: 'cash' },
    { id: 2, name: 'point' },
    { id: 3, name: 'mile' },
  ]

  await knex('reward_type').insert(rewardTypes)
}