/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../db')
const {User, Order} = require('./index')
const seed = require('../../../script/seed')

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
  describe('Model associations', () => {
    it('a user may have many orders', async () => {
      const sallysCampus = await student1.getCampus()
      expect(sallysCampus.name).to.equal(campus.name)
    })

    it('a campus may have many enrolled students', async () => {
      const result = await campus.hasStudents([student1, student2])
      expect(result).to.be.equal(true)
    })
  })
}) // end describe('User model')
