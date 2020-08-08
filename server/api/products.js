const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/masks', async (req, res, next) => {
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

router.get('/faceshields', async (req, res, next) => {
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

router.get('/sanitizers', async (req, res, next) => {
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

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    if (product) {
      res.json(product)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', (req, res, next) => {
  try {
    const newProduct = Product.create(req.body)
    res.status(201).json(newProduct)
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    if (!product) {
      return res.sendStatus(404)
    }
    await product.update(req.body)
    res.json(product)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    if (!product) {
      return res.sendStatus(404)
    }
    await product.destroy()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
