import React from 'react'
import {connect} from 'react-redux'
import CartProductDetail from './cart-product-details'
import CardDeck from 'react-bootstrap/CardDeck'
import Container from 'react-bootstrap/Container'
import {fetchCart} from '../store/cart'

/**
 * COMPONENT
 */
export class Cart extends React.Component {
  render() {
    const cart = this.props.cart
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
                      increment={this.increment}
                      loadCart={this.props.loadCart}
                    />
                  ))
                : `Your cart is currently empty`}
            </Container>
          </CardDeck>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart
})

const mapDispatch = dispatch => ({
  loadCart: () => dispatch(fetchCart())
})

export default connect(mapState, mapDispatch)(Cart)
