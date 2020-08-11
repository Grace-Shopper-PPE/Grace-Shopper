export const addToLocalCart = (id, name, price, imageUrl) => {
  let localCart = localStorage.getItem('CART')

  if (!localCart) {
    console.log('empty local')
    const newCartItem = [{productId: id, name, quantity: 1, price, imageUrl}]
    localStorage.setItem('CART', JSON.stringify(newCartItem))
  } else {
    // localCart = localStorage.removeItem('CART') }
    localCart = localStorage.getItem('CART')
    const cartArr = JSON.parse(localCart)
    const containsItem = cartArr.filter(item => item.productId === id)
    if (containsItem.length) {
      cartArr.map(item => {
        if (item.productId === id) {
          item.quantity = Number(item.quantity) + 1
        }
      })
    } else {
      cartArr.push({productId: id, name, quantity: 1, price, imageUrl})
    }
    localStorage.setItem('CART', JSON.stringify(cartArr))
  }
  localCart = localStorage.getItem('CART')
  let cartArr = JSON.parse(localCart)
  const total = cartArr.reduce((accum, item) => accum + item.quantity, 0)
  document.querySelector('.cart-nav span').textContent = total
}

export const cartNav = () => {
  const localCart = localStorage.getItem('CART')

  let arr = JSON.parse(localCart)
  let total = arr.reduce((accum, item) => accum + item.quantity, 0)
  total = JSON.stringify(total)
  console.log('tot2:', total)
  return total
}
