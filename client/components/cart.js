import React from 'react'
import {connect} from 'react-redux'
import CartProductDetail from './cart-product-details'
import CardDeck from 'react-bootstrap/CardDeck'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import {fetchCart, checkoutCart, stripeCheckout} from '../store/cart'
import PurchaseModal from './purchase-modal'

/**
 * COMPONENT
 */
class Cart extends React.Component {
  constructor() {
    super()
    this.checkout = this.checkout.bind(this)
    this.createStripeSession = this.createStripeSession.bind(this)
  }

  checkout() {
    this.props.order(this.props.cart)
  }

  async createStripeSession(cart) {
    let stripeSession = await this.props.startPurchase(cart)
    console.log('~~~~', stripeSession)
  }

  render() {
    let cart
    if (this.props.currentUser.id) {
      cart = this.props.cart
    } else {
      let localCart = localStorage.getItem('CART')
      cart = JSON.parse(localCart)
    }
    let total

    if (cart) {
      total = (
        cart.reduce(
          (accum, cartItem) =>
            accum + cartItem.product.price * cartItem.quantity,
          0
        ) / 100
      ).toFixed(2)
    } else {
      total = 0
    }

    let stripe = process.env.STRIPE_SECRET_KEY

    return (
      <div>
        <h3>Welcome to your Cart page</h3>
        <div className="d-flex flex-column">
          <CardDeck>
            <Container>
              {cart
                ? cart.map(cartItem => (
                    <CartProductDetail
                      key={cartItem.productId}
                      cartItem={cartItem}
                      loadCart={this.props.loadCart}
                    />
                  ))
                : `Your cart is currently empty`}
            </Container>
          </CardDeck>
          <Container className="d-flex justify-content-center">
            {cart && this.props.currentUser.id ? (
              <Button onClick={() => this.createStripeSession(cart)}>
                BUTTON
              </Button>
            ) : (
              <Button onClick={() => history.push('/signup')}>Purchase</Button>
            )}
            <div className="total mx-2 align-self-center">
              {' '}
              Total: ${total}{' '}
            </div>
          </Container>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart,
  currentUser: state.currentUser
})

const mapDispatch = dispatch => ({
  loadCart: () => dispatch(fetchCart()),
  order: cart => dispatch(checkoutCart(cart)),
  startPurchase: cart => dispatch(stripeCheckout(cart))
})

export default connect(mapState, mapDispatch)(Cart)
