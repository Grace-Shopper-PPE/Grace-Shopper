'use strict'
//import chance a native node module to generate random strings, numbers etc.
const chance = require('chance')(123)
//node promise library
const Promise = require('bluebird')
const GenerateImage = require('generate-image')

const db = require('../server/db')
const {User, Product, Order, OrderProducts} = require('../server/db/models')

const numUsers = 50
const numProducts = 100
const numCartsOrders = 50

// ===== helper functions =======
const emails = chance.unique(chance.email, numUsers)
// const userIds = chance.unique(chance.integer, numUsers, { min: 1, max: 50 })
// const productIds = chance.unique(chance.integer, numProducts, { min: 1, max: 100 })
// const orderIds = chance.unique(chance.integer, numCartsOrders, { min: 1, max: 50 })
// console.log(CartOrderIds)
const category = ['mask', 'sanitizer', 'face-shield']

// helper function
// takes in a number of users we want and a callback function (random user or random product)
function doTimes(n, fn) {
  const results = []
  while (n--) {
    results.push(fn())
  }
  return results
}

function randImage() {
  return GenerateImage({
    w: 200,
    h: 150,
    t: 'diagonal',
    c: 'No Image',
    bc: chance.color(),
    fc: chance.color({format: 'shorthex'})
  })
}

// ===== generate singles =======
function randUser() {
  const gender = chance.gender()
  return User.build({
    // id: userIds.pop(),
    firstName: chance.first({gender: gender}),
    lastName: chance.last(),
    phoneNumber: chance.phone(),
    email: emails.pop(),
    password: chance.word({syllables: 6}),
    address: chance.address(),
    isAdmin: chance.weighted([true, false], [5, 95])
  })
}

function randProductName() {
  const numWords = chance.natural({
    min: 1,
    max: 5
  })
  return chance
    .sentence({words: numWords})
    .replace(/\b\w/g, function(m) {
      return m.toUpperCase()
    })
    .slice(0, -1)
}

function randProduct() {
  return Product.build({
    // id: productIds.pop(),
    name: randProductName(),
    imageUrl: randImage(),
    quantity: chance.integer({min: 1, max: 1000}),
    description: chance.paragraph({sentences: 5}),
    price: chance.integer({min: 1, max: 500}),
    color: chance.color({format: 'shorthex'}),
    category: chance.pickone(category)
  })
}

function randOrder() {
  return Order.build({
    // id: orderIds.pop(),
    userId: chance.integer({min: 1, max: 50}),
    isComplete: chance.weighted([true, false], [50, 50])
  })
}

function randCart() {
  return OrderProducts.build({
    orderId: chance.integer({min: 1, max: 50}),
    productId: chance.integer({min: 1, max: 100}),
    quantity: chance.integer({min: 1, max: 1000}),
    price: chance.integer({min: null, max: 500})
  })
}

// ===== generate multiple  =======
function generateUsers() {
  // const initial = []
  const users = doTimes(numUsers, randUser)
  users.push(
    User.build({
      // id: 1,
      firstName: 'Zeke',
      lastName: 'Nierenberg',
      phone: '(510) 295-5523',
      email: 'zeke@zeke.zeke',
      password: 'abcdefg',
      isAdmin: true
    })
  )
  users.push(
    User.build({
      // id: 2,
      firstName: 'Omri',
      lastName: 'Bernstein',
      phone: '(781) 854-8854',
      email: 'omri@zeke.zeke',
      password: 'abcdefg'
    })
  )

  return users
  // return initial.concat(users)
}

function generateProducts() {
  // const initial = []
  const products = doTimes(numProducts, randProduct)
  products.push(
    Product.build({
      // id: 1,
      name: 'Cotton Facemask',
      price: 494,
      quantity: 55,
      category: 'mask',
      description:
        'Facemask Cotton Face Mask With Filter Pocket PM2.5 Filter 2 Layer Washable Face Mask Reusable Mask',
      imageUrl:
        'https://ih1.redbubble.net/image.1193579924.0976/ur,mask_three_quarter,tall_portrait,750x1000.jpg'
    })
  )

  products.push(
    Product.build({
      // id: 2,
      name: 'Rainbow Sun Shield',
      price: 1699,
      quantity: 15,
      category: 'face-shield',
      description:
        'Sun visor UV Protection, Hat Cap, Rainbow Visor, Sun cap, Face Shield',
      imageUrl:
        'https://i.etsystatic.com/18717999/r/il/c67c2d/2487349479/il_794xN.2487349479_qr23.jpg'
    })
  )

  products.push(
    Product.build({
      // id: 3,
      name: 'Ladybug Faceshield',
      price: 1950,
      quantity: 40,
      category: 'face-shield',
      color: 'red',
      description:
        'Clear Face Shield with Printed Designs for Kids and Adults. Comfortable PPE that can be used with goggles & facemask if needed',
      imageUrl:
        'https://i.etsystatic.com/22957671/r/il/9d0aec/2449990780/il_794xN.2449990780_3re3.jpg'
    })
  )
  return products
  // return initial.concat(products)
}

function generateOrders() {
  return doTimes(numCartsOrders, () => {
    return randOrder()
  })
}
function generateCarts() {
  return doTimes(numCartsOrders, () => {
    return randCart()
  })
}

// ===== create and save the multiples in the database =======
function createUsers() {
  return Promise.map(generateUsers(), user => {
    return user.save()
  })
}

function createProducts() {
  return Promise.map(generateProducts(), product => {
    return product.save()
  })
}

function createOrders() {
  return Promise.map(generateOrders(), order => {
    return order.save()
  })
}

function createCarts() {
  return Promise.map(generateCarts(), cart => {
    return cart.save()
  })
}

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await createUsers()
  const products = await createProducts()
  const orders = await createOrders()
  const carts = await createCarts()

  console.log(`seeded ${users.length} users`)
  console.log(`seeding ${products.length} products successfully`)
  console.log(`seeding ${orders.length} orders successfully`)
  console.log(`seeding ${carts.length} cart items successfully`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
