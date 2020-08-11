/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../db')
const orderProducts = require('./index')

describe('orderProducts Model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Validations', () => {
    it('`isComplete` has a truthy value', async () => {
      const orderProd1 = await orderProducts.create({
        isComplete: true
      })
      const orderProd2 = await orderProducts.create({
        isComplete: null
      })
      expect(orderProd1.isComplete).to.equal(true)
      expect(orderProd2.isComplete).to.equal(false)
    })
  })
})
