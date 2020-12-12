exports.seed = async function (knex) {
  await knex('category').del()

  const categories = [
    { id: 1, name: 'dining' },
    { id: 2, name: 'travel' },
    { id: 3, name: 'grocery' },
    { id: 4, name: 'drugstore' },
    { id: 5, name: 'gas station' },
    { id: 6, name: 'wholesale club' },
    { id: 7, name: 'streaming service' },
    { id: 8, name: 'online shopping' },
    { id: 9, name: 'electronics' },
  ]

  await knex('category').insert(categories)
}