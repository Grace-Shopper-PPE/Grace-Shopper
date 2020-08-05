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
