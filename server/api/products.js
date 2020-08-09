const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

// for any /users/:id routes, this piece of middleware
// will be executed, and put the user on `req.requestedUser`
router.param('id', async (req, res, next, id) => {
  try {
    const product = await Product.findByPk(id)
    if (!product) res.sendStatus(404)
    req.requestedProduct = product
    next()
    return null
  } catch (err) {
    next(err)
  }
})

const isAdminMiddleware = (req, res, next) => {
  // if the current user doesn't have an account/not logged in
  // or if the current user is logged in but is not admin
  // they cannot add/edit/delete products
  if (!req.user || !req.user.isAdmin) {
    const err = new Error(`You aren't authorized to do that`)
    err.status = 401
    next(err)
  } else {
    next()
  }
}

const preventApiAccess = (req, res, next) => {
  if (!req.user || req.user) {
    const err = new Error(`Please pick another route`)
    err.status = 401
    next(err)
  } else {
    next()
  }
}

router.get('/', preventApiAccess, async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/masks', preventApiAccess, async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        category: 'mask'
      }
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/faceshields', preventApiAccess, async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        category: 'face-shield'
      }
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/sanitizers', preventApiAccess, async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        category: 'sanitizer'
      }
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', preventApiAccess, async (req, res, next) => {
  try {
    const product = await req.requestedProduct
    if (product) {
      res.json(product)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', isAdminMiddleware, (req, res, next) => {
  try {
    const newProduct = Product.create(req.body)
    res.status(201).json(newProduct)
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', isAdminMiddleware, async (req, res, next) => {
  try {
    const product = await req.requestedProduct
    if (!product) {
      return res.sendStatus(404)
    }
    await product.update(req.body)
    res.json(product)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', isAdminMiddleware, async (req, res, next) => {
  try {
    const product = await req.requestedProduct
    if (!product) {
      return res.sendStatus(404)
    }
    await product.destroy()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
