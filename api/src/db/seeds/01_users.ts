import { Auth } from '../../models/index'

import * as Knex from "knex"

export async function seed(knex: Knex): Promise<void> {
  await knex('user').del()

  let users = [
    { id: 1, username: 'jeru', password: 'password' },
    { id: 2, username: 'john', password: 'password' },
    { id: 3, username: 'jesus', password: 'password' }
  ]

  users = await Promise.all(users.map(async user => {
    const password = await Auth.hashPassword(user.password)
    const token = Auth.generateToken()
    return {
      ...user,
      password,
      token
    }
  }))

  await knex('user')
    .insert(users)
}
