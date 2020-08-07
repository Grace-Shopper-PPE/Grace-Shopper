const router = require('express').Router()
const {Order, OrderProducts, Product} = require('../db/models')
const models = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const cart = await Order.findAll({
      where: {
        userId: req.user.id,
        isComplete: false
      }
    })
    const products = await OrderProducts.findAll({
      where: {
        orderId: cart[0].id
      },
      include: [Product]
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const cart = await Order.findAll({
      where: {
        userId: req.user.id,
        isComplete: false
      }
    })
    if (!cart) {
      const newCart = await Order.create({userId: req.user.id})
      res.status(201).json(newCart)
    }
    const newCartProduct = OrderProducts.create(req.body)
    res.status(201).json(newCartProduct)
  } catch (error) {
    next(error)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const cartItem = await OrderProducts.findOne({
      where: {
        orderId: req.body.orderId,
        productId: req.body.productId
      }
    })
    await cartItem.update({quantity: cartItem.quantity + 1})
    res.json(cartItem)
  } catch (error) {
    next(error)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    const cartItem = await OrderProducts.findOne({
      where: {
        orderId: req.body.orderId,
        productId: req.body.productId
      }
    })
    if (!cartItem) {
      return res.sendStatus(404)
    }
    await cartItem.destroy()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
