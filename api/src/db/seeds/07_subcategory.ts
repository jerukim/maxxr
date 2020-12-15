import * as Knex from "knex"

export async function seed(knex: Knex): Promise<void> {
  await knex('subcategory').del()

  const subcategories = [
    { id: 1, name: 'Chase Ultimate Rewards' },
    { id: 2, name: 'CVS' },
    { id: 3, name: 'Walgreens' },
    { id: 4, name: 'Apple Music' },
    { id: 5, name: 'Apple TV+' },
    { id: 6, name: 'AT&T TV Now' },
    { id: 7, name: 'BET+' },
    { id: 8, name: 'CBS All Access' },
    { id: 9, name: 'DAZN' },
    { id: 10, name: 'Disney +' },
    { id: 11, name: 'ESPN+' },
    { id: 12, name: 'Fubo TV' },
    { id: 13, name: 'Google Play Movies & TV' },
    { id: 14, name: 'HBO Max' },
    { id: 15, name: 'Hulu' },
    { id: 16, name: 'Netflix' },
    { id: 17, name: 'Pandora' },
    { id: 18, name: 'Philo' },
    { id: 19, name: 'Peacock TV' },
    { id: 20, name: 'Showtime' },
    { id: 21, name: 'Sirius XM' },
    { id: 22, name: 'Starz' },
    { id: 23, name: 'Sling' },
    { id: 24, name: 'Spotify' },
    { id: 25, name: 'Vudu' },
    { id: 26, name: 'YouTube TV' },
    { id: 27, name: 'PayPal' },
    { id: 28, name: 'Amazon.com' },
    { id: 29, name: 'Target.com' },
    { id: 30, name: 'Walmart.com' },
    { id: 31, name: 'Best Buy' },
  ]

  await knex('subcategory').insert(subcategories)
}