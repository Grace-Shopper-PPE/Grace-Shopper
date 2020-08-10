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
    next()
    return null
  } catch (err) {
    next(err)
  }
})

/* use the following in the browser console to test if a new user can force his/her isAdmin status to be true
const user = {
firstName: 'Lu',
lastName: 'Wang',
email:'loowang@hotmail.com',
isAdmin:true}

fetch('/api/users', {
  method: 'POST',
  credentials: 'same-origin', // this will send our session cookie with this AJAX request, thus allowing our server to establish the session and current user
  body: JSON.stringify(user)
});
*/

const isAdminMiddleware = (req, res, next) => {
  // if the current user doesn't have an account/not logged in
  // or if the current user is logged in but is not admin
  // or if the current user is logged in, not admin but he/she is not the user on the page
  // the current user cannot view/edit/delete anyone but him/herself
  if (!req.user) {
    const err = new Error('Please sign up or log in')
    err.status = 401
    next(err)
  } else if (req.user.isAdmin === false) {
    //if the current user is not admin and is not his/her own profile
    const err = new Error(`I'm watching you...`)
    err.status = 401
    next(err)
  } else {
    next()
  }
}

router.get('/', isAdminMiddleware, async (req, res, next) => {
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

router.get('/:id', isAdminMiddleware, async (req, res, next) => {
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

router.post('/', isAdminMiddleware, async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', isAdminMiddleware, async (req, res, next) => {
  try {
    const updatedUser = await req.requestedUser.update(req.body)
    res.json(updatedUser)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', isAdminMiddleware, async (req, res, next) => {
  try {
    await req.requestedUser.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
