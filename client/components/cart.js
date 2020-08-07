import React from 'react'
import {connect} from 'react-redux'
import {fetchCart, incrementQuantity} from '../store/cart'
import CartProductDetail from './cart-product-details'
import CardDeck from 'react-bootstrap/CardDeck'
import Container from 'react-bootstrap/Container'

/**
 * COMPONENT
 */
export class Cart extends React.Component {
  constructor() {
    super()
    this.increment = this.increment.bind(this)
  }

  componentDidMount() {
    this.props.loadCart()
  }

  async increment(orderId, productId) {
    const productToIncrement = {
      orderId,
      productId
    }
    await this.props.add(productToIncrement)
    this.props.loadCart()
  }

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
  loadCart: () => dispatch(fetchCart()),
  add: item => dispatch(incrementQuantity(item))
})

export default connect(mapState, mapDispatch)(Cart)
