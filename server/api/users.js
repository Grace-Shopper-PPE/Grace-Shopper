const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

// for any /users/:id routes, this piece of middleware
// will be executed, and put the user on `req.requestedUser`
router.param('id', async (req, res, next, id) => {
  try {
    const user = await User.findByPk(id)
    if (!user) res.sendStatus(404)
    req.requestedUser = user
    console.log(req.requestedUser)
    next()
    return null
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['firstName', 'lastName', 'id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await req.requestedUser
    if (user) {
      res.json(user)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const updatedUser = await req.requestedUser.update(req.body)
    res.json(updatedUser)
  } catch (err) {
    next(err)
  }
})

const isAdminMiddleware = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    const err = new Error('Unauthorized')
    err.status = 401
    next(err)
  } else {
    next()
  }
}

router.delete('/:id', isAdminMiddleware, async (req, res, next) => {
  try {
    await req.requestedUser.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
