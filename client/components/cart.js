import React from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cart'
import CartProductDetail from './cart-product-details'
import CardDeck from 'react-bootstrap/CardDeck'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

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
        <h3>Welcome to your Cart page</h3>
        <div className="d-flex flex-column">
          <CardDeck>
            <Container>
              {cart.length > 0
                ? cart.map(product => (
                    <CartProductDetail
                      key={product.productId}
                      product={product}
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
