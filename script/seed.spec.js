'use strict'
/* global describe it */

const seed = require('./seed')

describe('seed script', () => {
  let users, orders
  beforeEach(async () => {
    await seed()
    orders = await Order.findAll({include: [User]})
    users = await User.findAll({include: [Order]})
  })

  it('completes successfully', seed)
})
