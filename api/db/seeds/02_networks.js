exports.seed = async function (knex) {
  await knex('network').del()

  const networks = [
    { id: 1, name: 'Visa' },
    { id: 2, name: 'Mastercard' },
    { id: 3, name: 'American Express' },
    { id: 4, name: 'Discover' },
  ]

  await knex('network').insert(networks)
}
