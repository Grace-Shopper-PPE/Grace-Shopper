const router = require('express').Router()
const {Order, OrderProducts, Product} = require('../db/models')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
module.exports = router
const {v4: uuid} = require('uuid')

router.post('/', async (req, res, next) => {
  let error
  let status
  try {
    const {total, token} = req.body
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    })

    const idempotencyKey = uuid()
    const charge = await stripe.charges.create(
      {
        amount: total,
        currency: 'usd',
        customer: customer.id,
        receipt_email: token.email,
        description: 'Purchased',
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      },
      {idempotencyKey}
    )
    status = 'success'
  } catch (err) {
    console.error('error:', err)
    error = err
    status = 'failure'
  }
  res.json({error, status})
})

router.post('/complete', async (req, res, next) => {
  try {
    const {cart} = req.body
    const orderInfo = await Order.findOne({
      where: {
        userId: req.user.id,
        isComplete: false
      }
    })
    cart.forEach(async cartItem => {
      const inventory = await Product.findByPk(cartItem.productId)
      inventory.update({quantity: inventory.quantity - cartItem.quantity})
    })

    cart.forEach(async cartItem => {
      const order = await OrderProducts.findOne({
        where: {
          productId: cartItem.productId,
          orderId: cartItem.orderId
        }
      })
      order.update({price: cartItem.product.price})
    })

    orderInfo.update({isComplete: true})
    res.json(order.isComplete)
  } catch (error) {
    console.log(error)
  }
})
