/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail,
        firstName: 'Cody',
        lastName: 'Dog'
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })

    it('GET /api/user/:id', async () => {
      const res = await request(app)
        .get('/api/users/1')
        .expect(200)
      expect(res.body.email).to.be.equal(codysEmail)
    })

    xit('POST /api/users', async () => {
      const res = await request(app)
        .post('/api/users')
        .expect(201)
      const createUser = await User.findByPk(res.body.id)
      expect(createUser.email).to.be.equal(codysEmail)
    })

    it('PUT /api/users', async () => {
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

it('DELETE /api/users', async () => {
  let cody = User.create({
    email: 'new_emaiL@gmail.com',
    firstName: 'Cody',
    lastName: 'Dog'
  })
  await request(app)
    .delete('/api/users/1')
    // .delete(`/api/users/${cody.id}`)
    .expect(204)

  const checkCody = await User.findByPk(cody.id)
  expect(checkCody).to.equal(null)
}) // end describe('/api/users')

// e
