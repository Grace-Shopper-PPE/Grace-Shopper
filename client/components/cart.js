import React from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cart'
import CartProductDetail from './cart-product-details'
import CardDeck from 'react-bootstrap/CardDeck'

/**
 * COMPONENT
 */
export class Cart extends React.Component {
  componentDidMount() {
    this.props.loadCart()
  }

  render() {
    const cart = this.props.cart
    return (
      <div>
        <h3>Welcome to the product page</h3>
        <div className="d-flex justify-content-center">
          <CardDeck>
            {cart.length > 0
              ? cart.map(product => (
                  <CartProductDetail
                    key={product.productId}
                    product={product}
                  />
                ))
              : `Your cart is currently empty`}
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
