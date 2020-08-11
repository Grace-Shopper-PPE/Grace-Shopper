/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')
const orderProducts = db.model('orderProducts')
const Product = db.model('orderProducts')

describe('Order PUT Route', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/order', () => {
    let faceMask, faceShield, sanitizer

    beforeEach(async () => {
      faceMask = await Product.create({
        name: 'N95',
        category: 'mask',
        price: 1000
      })

      faceShield = await Product.create({
        name: 'Rainbow Shield',
        category: 'face-shield',
        price: 10000
      })

      sanitizer = await Product.create({
        name: 'Purell',
        category: 'sanitizer',
        price: 1200
      })
    })

    beforeEach(() => {
      return Order.create({
        userId: 1,
        product: [faceMask, faceShield, sanitizer]
      })
    })

    it('PUT /api/users', async () => {
      await request(app)
        .put('/api/users/1')
        .send({
          email: 'new_emaiL@gmail.com'
        })
        .expect(200)

      const fetchCody = await User.findByPk(1)
      expect(fetchCody.email).to.equal('new_emaiL@gmail.com')
    }) // end describe('/api/users')
  })
}) // end describe('User routes')
