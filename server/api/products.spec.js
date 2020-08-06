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

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')

      expect(res.body[0].name).to.be.equal('N95')
    })

    it('GET all Masks /api/products/masks', async () => {
      const res = await request(app)
        .get('/api/products/masks')
        .expect(200)

      expect(res.body).to.be.an('array')

      expect(res.body[0].name).to.be.equal('N95')
      expect(res.body[0].category).to.be.equal('mask')
    })

    it('GET all Face Shields /api/products/faceshields', async () => {
      const res = await request(app)
        .get('/api/products/faceshields')
        .expect(200)

      expect(res.body).to.be.an('array')

      expect(res.body[0].name).to.be.equal('Rainbow Shield')
      expect(res.body[0].category).to.be.equal('face-shield')
    })
    it('GET all sanitizers /api/products/sanitizers', async () => {
      const res = await request(app)
        .get('/api/products/sanitizers')
        .expect(200)

      expect(res.body).to.be.an('array')

      expect(res.body[0].name).to.be.equal('Purell')
      expect(res.body[0].category).to.be.equal('sanitizer')
    })
  })
})
