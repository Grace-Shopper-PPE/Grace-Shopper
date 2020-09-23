const router = require('express').Router()
const {Order, OrderProducts, Product} = require('../db/models')
module.exports = router
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripe = require('stripe')(stripeSecretKey)

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

router.post('/checkout-session', async (req, res) => {
  console.log('+++', req.body.cart)
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Stubborn Attachments',
            images: ['https://i.imgur.com/EHyR2nP.png']
          },
          unit_amount: 2000
        },
        quantity: 1
      }
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`
  })
  res.json({id: session.id})
})
