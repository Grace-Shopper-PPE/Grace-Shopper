/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const orderProducts = db.model('orderProducts')

describe('orderProducts Model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Validations', () => {
    it('has `isComplete` and `price`', async () => {
      const orderProd = await orderProducts.create({
        isComplete: true,
        price: 700
      })

      expect(orderProd.isComplete).to.equal(true)
      expect(orderProd.price).to.equal(700)
    })
  })
})
