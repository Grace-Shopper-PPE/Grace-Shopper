/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')
const OrderProducts = db.model('orderProducts')
const Product = db.model('orderProducts')

describe('Cart routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/cart/', () => {
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

    it('GET /api/cart', async () => {
      const res = await request(app)
        .get('/api/cart')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].userId).to.be.equal(1)
    })

    xit('POST /api/users', async () => {
      const res = await request(app)
        .post('/api/users')
        .expect(201)
      const createUser = await User.findByPk(res.body.id)
      expect(createUser.email).to.be.equal(codysEmail)
    })

    xit('PUT /api/users', async () => {
      // let cody = User.create({
      //   email: codysEmail,
      //   firstName: 'Cody',
      //   lastName: 'Dog'
      // })
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

xit('DELETE /api/users', async () => {
  let cody = User.create({
    email: 'new_emaiL@gmail.com',
    firstName: 'Cody',
    lastName: 'Dog',
    isAdmin: true
  })

  let lu = User.create({
    email: 'lulu@gmail.com',
    firstName: 'Lu',
    lastName: 'Wang',
    isAdmin: false
  })
  await request(app)
    .delete('/api/users/2')
    .expect(204)

  await request(app)
    .delete('/api/users/1')
    .expect(401)

  const checkLu = await User.findByPk(lu.id)
  expect(checkLu).to.equal(null)

  const checkCody = await User.findByPk(cody.id)
  expect(checkCody).to.equal(checkCody)
})
