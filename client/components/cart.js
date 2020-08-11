import React from 'react'
import {connect} from 'react-redux'
import CartProductDetail from './cart-product-details'
import CardDeck from 'react-bootstrap/CardDeck'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import {fetchCart, checkoutCart} from '../store/cart'

/**
 * COMPONENT
 */
const Cart = props => {
  let cart
  let total

  if (props.currentUser.id) {
    cart = props.cart
    total = (
      cart.reduce(
        (accum, cartItem) => accum + cartItem.product.price * cartItem.quantity,
        0
      ) / 100
    ).toFixed(2)
  } else {
    cart = JSON.parse(localStorage.getItem('CART'))
    total = (
      cart.reduce(
        (accum, cartItem) => accum + cartItem.price * cartItem.quantity,
        0
      ) / 100
    ).toFixed(2)
  }

  const checkout = async () => {
    await props.order(cart)
    alert('Your order is now being processed. Thank you!')
    props.history.push('/products')
  }

  return (
    <div>
      <h3>Welcome to your Cart page</h3>
      <div className="d-flex flex-column">
        <CardDeck>
          <Container>
            {cart.length > 0
              ? cart.map(product => (
                  <CartProductDetail
                    key={product.productId}
                    product={product}
                    loadCart={props.loadCart}
                  />
                ))
              : `Your cart is currently empty`}
          </Container>
        </CardDeck>
        <Container className="d-flex justify-content-center">
          <Button onClick={() => checkout()} className="mx-2" variant="primary">
            Purchase
          </Button>
          <div className="total mx-2 align-self-center"> Total: ${total} </div>
        </Container>
      </div>
    </div>
  )
}

const mapState = state => ({
  cart: state.cart,
  currentUser: state.currentUser
})

const mapDispatch = dispatch => ({
  loadCart: () => dispatch(fetchCart()),
  order: cart => dispatch(checkoutCart(cart))
})

export default connect(mapState, mapDispatch)(Cart)
