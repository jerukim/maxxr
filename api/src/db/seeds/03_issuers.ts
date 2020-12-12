import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex('issuer').del()

  const issuers = [
    { id: 1, name: 'Chase' },
    { id: 2, name: 'Discover' },
  ]
  // { id: 1, name: 'Barclays' },
  // { id: 1, name: 'American Express' },
  // { id: 1, name: 'Apple' },
  // { id: 1, name: 'Bank of America' },
  // { id: 1, name: 'Capital One' },
  // { id: 1, name: 'Citi' },
  // { id: 1, name: 'Credit One' },
  // { id: 1, name: 'First National' },
  // { id: 1, name: 'HSBC' },
  // { id: 1, name: 'Mastercard' },
  // { id: 1, name: 'PNC' },
  // { id: 1, name: 'US Bank' },
  // { id: 1, name: 'Visa' },
  // { id: 1, name: 'Wells Fargo' },
  /*
  Aliant
  BBVA
  Brex
  Comenity
  Fifth Third Bank
  Fingerhut
  Green Dot Bank
  Luxury Card
  Navy Federal Credit Union
  PenFed Credit Union
  Pentagon Federal Credit Union
  Petal
  Simmons Bank
  Synchrony Financial
  TD Bank
  UBS Bank
  USAA
  */

  await knex('issuer').insert(issuers)
}