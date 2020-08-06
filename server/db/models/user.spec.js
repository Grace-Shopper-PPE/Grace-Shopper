/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Validations', () => {
    it('firstName, lastName and email are not null', async () => {
      const user1 = User.build({lastName: 'Dog', email: 'cody@dog.com'})
      const user2 = User.build({firstName: 'Cody', email: 'cody@dog.com'})
      const user3 = User.build({firstName: 'Cody', lastName: 'Dog'})
      try {
        await user1.validate()
        await user2.validate()
        await user3.validate()
        throw Error('validation was successful but field is missing')
      } catch (err) {
        expect(err.message).to.contain('notNull Violation')
      }
    })
  })

  it('`email` contains a valid email address', async () => {
    const user = User.build({firstName: 'Cody', lastName: 'Dog', email: 'pug'})
    try {
      await user.validate()
      throw Error(
        'validation was successful but the email address is not valid'
      )
    } catch (err) {
      expect(err.message).to.contain('Validation isEmail on email failed')
    }
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          firstName: 'Cody',
          lastName: 'Dog',
          email: 'cody@puppybook.com',
          password: 'bones1243'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones1243')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
