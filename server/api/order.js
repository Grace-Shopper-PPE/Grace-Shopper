const router = require('express').Router()
const {Order, OrderProducts, Product} = require('../db/models')
module.exports = router

router.put('/', async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.user.id,
        isComplete: false
      }
    })

    req.body.forEach(async cartItem => {
      const inventory = await Product.findByPk(cartItem.productId)
      inventory.update({quantity: inventory.quantity - cartItem.quantity})
    })

    req.body.forEach(async cartItem => {
      const order = await OrderProducts.findOne({
        where: {
          productId: cartItem.productId,
          orderId: cartItem.orderId
        }
      })
      order.update({price: cartItem.product.price})
    })

    cart.update({isComplete: true})
    res.json(cart)
  } catch (error) {
    next(error)
  }
})
