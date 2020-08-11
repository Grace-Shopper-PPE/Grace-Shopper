import React from 'react'
import {connect} from 'react-redux'
import CartProductDetail from './cart-product-details'
import CardDeck from 'react-bootstrap/CardDeck'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import {fetchCart, checkoutCart} from '../store/cart'
import PurchaseModal from './purchase-modal'

/**
 * COMPONENT
 */
const Cart = props => {
  const cart = props.cart
  const total = (
    cart.reduce(
      (accum, cartItem) => accum + cartItem.product.price * cartItem.quantity,
      0
    ) / 100
  ).toFixed(2)

  const checkout = async () => {
    await props.order(cart)
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
          {cart.length > 0 ? (
            <PurchaseModal checkout={checkout} />
          ) : (
            <Button disabled style={{pointerEvents: 'none'}}>
              Purchase
            </Button>
          )}
          <div className="total mx-2 align-self-center"> Total: ${total} </div>
        </Container>
      </div>
    </div>
  )
}

const mapState = state => ({
  cart: state.cart
})

const mapDispatch = dispatch => ({
  loadCart: () => dispatch(fetchCart()),
  order: cart => dispatch(checkoutCart(cart))
})

export default connect(mapState, mapDispatch)(Cart)
