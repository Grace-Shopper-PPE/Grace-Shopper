import axios from 'axios'

export const addToLocalCart = product => {
  // localStorage.removeItem('CART')
  let localCart = localStorage.getItem('CART')

  // if there is no local cart, create one
  if (!localCart) {
    localStorage.setItem('CART', JSON.stringify([]))
  }

  localCart = localStorage.getItem('CART')
  const cartArr = JSON.parse(localCart)
  const containsItem = cartArr.filter(item => item.productId === product.id)
  // if item is not in cart, built item for cart
  if (!containsItem.length) {
    const cartItem = {
      orderId: null,
      productId: product.id,
      price: null,
      quantity: 1,
      product
    }
    cartArr.push(cartItem)
    // if item is in cart, increment quantity
  } else {
    cartArr.map(item => {
      if (item.productId === product.id) {
        item.quantity = item.quantity + 1
      }
    })
  }
  let cartString = JSON.stringify(cartArr)
  localStorage.setItem('CART', cartString)

  localCart = localStorage.getItem('CART')
  let cartSize = JSON.parse(localCart).reduce(
    (accum, item) => accum + item.quantity,
    0
  )
  document.querySelector('.cart-nav span').textContent = cartSize
}

export const decrementFromLocalCart = product => {
  let localCart = localStorage.getItem('CART')
  let cartArr = JSON.parse(localCart)
  cartArr.map(item => {
    if (item.productId === product.id) {
      item.quantity = item.quantity - 1
    }
  })
  let cartString = JSON.stringify(cartArr)
  localStorage.setItem('CART', cartString)

  localCart = localStorage.getItem('CART')
  let cartSize = JSON.parse(localCart).reduce(
    (accum, item) => accum + item.quantity,
    0
  )
  document.querySelector('.cart-nav span').textContent = cartSize
}

export const removeFromLocalCart = product => {
  let localCart = localStorage.getItem('CART')
  let cartArr = JSON.parse(localCart)
  cartArr.filter(item => item.productId !== product.id)

  let cartString = JSON.stringify(cartArr)
  localStorage.setItem('CART', cartString)

  localCart = localStorage.getItem('CART')
  let cartSize = JSON.parse(localCart).reduce(
    (accum, item) => accum + item.quantity,
    0
  )
  document.querySelector('.cart-nav span').textContent = cartSize
}

export const cartNav = () => {
  const localCart = localStorage.getItem('CART')
  // let cartSize = JSON.parse(localCart).reduce((accum, item) => accum + item.quantity, 0)
  // document.querySelector('.cart-nav span').textContent = cartSize
}
