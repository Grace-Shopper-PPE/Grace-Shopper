/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product Model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Validations', () => {
    it('requires a `name`', async () => {
      const product = Product.build({price: 1000})
      try {
        await product.validate()
        throw Error(
          'validation was successful but should have failed without `name`'
        )
      } catch (err) {
        expect(err.message).to.contain('name cannot be null')
      }
    })

    it('requires a `price`', async () => {
      const product = Product.build({name: 'Green mask'})
      try {
        await product.validate()
        throw Error(
          'validation was successful but should have failed without `price`'
        )
      } catch (err) {
        expect(err.message).to.contain('price cannot be null')
      }
    })

    it('name cannot be an empty string', async () => {
      const product = Product.build({name: '', price: 10000})
      try {
        await product.validate()
        throw Error(
          'validation was successful but should have failed while name value is an empty string'
        )
      } catch (err) {
        expect(err.message).to.contain('Validation error')
      }
    })

    it('price is greater than or equal to 1', async () => {
      const product = Product.build({price: 0})
      try {
        await product.validate()
        throw Error(
          'validation was successful but should have failed without `price`'
        )
      } catch (err) {
        expect(err.message).to.contain('Validation error')
      }
    })
  })
})
