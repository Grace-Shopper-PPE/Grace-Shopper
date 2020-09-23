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
  const {cart} = req.body
  const stripeCart = cart.reduce((accum, item) => {
    let stripeItem = {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.product.name,
          images: [item.product.imageUrl]
        },
        unit_amount: item.product.quantity
      },
      quantity: item.quantity
    }
    accum.push(stripeItem)
    return accum
  }, [])

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: stripeCart,
    mode: 'payment',
    success_url: `http://google.com`,
    cancel_url: `http://google.com`
  })
  console.log('******', session)
  res.json({id: session.id})
})
