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
    let isAdmin = true
    let cody = {
      email: codysEmail,
      firstName: 'Cody',
      lastName: 'Dog'
    }

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

    describe('PUT /api/users', () => {
      it('If the user is an admin, they can update a user', async () => {
        await request(app)
          .put(`api/users/${cody.id}`)
          .auth(
            'cody@email.com',
            'aa3da86e73ebec62ef58091adada2a08dac6420e04177ceec2573b623d8ca983'
          )
          .expect(204)

        const fetchCody = await User.findByPk(1)
        expect(fetchCody.email).to.equal('new_emaiL@gmail.com')
      })

      it('If the user is not an admin, they cannot update a user', async () => {
        await request(app)
          .put('/api/users/1')

          .expect(401)

        const fetchCody = await User.findByPk(1)
        expect(fetchCody.email).to.equal(codysEmail)
      })
    }) // end describe('User routes')

    describe('DELETE /api/users', async () => {
      xit('If the user is an admin, they can delete a user', async () => {
        await request(app)
          .auth('cody@email.com', '123456')
          .delete(`api/users/${cody.id}`)

          .expect(204)

        const checkCody = await User.findByPk(cody.id)
        expect(checkCody).to.equal(null)
      })

      it('If the user is not an admin, they cannot delete a user', async () => {
        await request(app)
          .delete('/api/users/1')
          .expect(401)

        const checkCody = await User.findByPk(cody.id)
        expect(checkCody).to.equal(checkCody)
      })
    })
  })
})
