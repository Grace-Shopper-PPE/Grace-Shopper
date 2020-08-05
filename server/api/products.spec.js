/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    const faceMask = 'N95'

    beforeEach(() => {
      return Product.create({
        name: faceMask,
        price: 10
      })
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(faceMask)
    })

    //     it('serves up a single Product by its `id`', async () => {
    //       const res = await request(app)
    //         .get('/api/products/1')
    //         .expect(200)
    //       console.log(res, 'response')
    //       expect(res.body.price).to.equal(10)
    //     })
  }) // end describe('/api/users')
})
