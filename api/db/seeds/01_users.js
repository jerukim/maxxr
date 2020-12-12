const { Auth } = require('../../models')

exports.seed = async function (knex) {
  await knex('user').del()

  let users = [
    { id: 1, username: 'jeru', password: 'password' },
    { id: 2, username: 'john', password: 'password' },
    { id: 3, username: 'jesus', password: 'password' }
  ]

  users = users.map(async user => {
    const password = await Auth.hashPassword(user.password)
    const token = Auth.generateToken()
    return {
      ...user,
      password,
      token
    }
  })

  users = await Promise.all(users)

  await knex('user')
    .insert(users)
}
