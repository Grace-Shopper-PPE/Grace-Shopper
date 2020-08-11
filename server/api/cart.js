const router = require('express').Router()
const {Order, OrderProducts, Product} = require('../db/models')
module.exports = router

// helper functions
const findCart = userId =>
  Order.findAll({
    where: {
      userId,
      isComplete: false
    }
  })
const findCartItem = (orderId, productId) =>
  OrderProducts.findOne({
    where: {
      orderId,
      productId
    }
  })

// Routes
router.get('/', async (req, res, next) => {
  try {
    const cart = await findCart(req.user.id)
    let orderId
    if (!cart.length) {
      const newCart = await Order.create({userId: req.user.id})
      res.status(201).json(newCart)
      orderId = newCart.orderId
    } else if (cart.length) {
      orderId = cart[0].dataValues.id
    }

    const products = await OrderProducts.findAll({
      where: {
        orderId: orderId
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
    const cart = await findCart(req.user.id)

    const newCartProduct = OrderProducts.create({
      orderId: cart[0].dataValues.id,
      productId: req.body.id
    })
    res.status(201).json(newCartProduct)
  } catch (error) {
    next(error)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const cart = await findCart(req.user.id)
    const cartItem = await findCartItem(cart[0].dataValues.id, req.body.id)

    if (req.body.inc) {
      await cartItem.update({quantity: cartItem.quantity + 1})
    } else if (req.body.dec) {
      await cartItem.update({quantity: cartItem.quantity - 1})
    }
    res.json(cartItem)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const cart = await findCart(req.user.id)
    const cartItem = await findCartItem(cart[0].dataValues.id, req.params.id)
    if (!cartItem) {
      return res.sendStatus(404)
    }
    await cartItem.destroy()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
