import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import {connect} from 'react-redux'
import {incrementQuantity, decrementQuantity, deleteItem} from '../store/cart'
import {
  addToLocalCart,
  decrementFromLocalCart,
  removeFromLocalCart
} from './local-cart'

const CartProductDetail = props => {
  const {product, quantity} = props.cartItem
  const {id, name, price, imageUrl, quantity: maxQuant} = product
  const newPrice = (price / 100).toFixed(2)
  const itemTotal = (newPrice * quantity).toFixed(2)

  const increment = async () => {
    if (props.currentUser.id) {
      await props.increase({id, inc: 'inc'})
      document.querySelector('.cart-nav span').textContent =
        Number(document.querySelector('.cart-nav span').textContent) + 1
      props.loadCart()
    } else {
      addToLocalCart(product)
      location.reload()
      return false
    }
  }

  const decrement = async () => {
    if (props.currentUser.id) {
      if (quantity > 1) {
        await props.decrease({id, dec: 'dec'})
      } else {
        await props.remove(id)
      }
      document.querySelector('.cart-nav span').textContent =
        Number(document.querySelector('.cart-nav span').textContent) - 1
      props.loadCart()
    }
    if (!props.currentUser.id) {
      if (quantity > 1) {
        decrementFromLocalCart(product)
      } else {
        removeFromLocalCart(product)
      }
      location.reload()
      return false
    }
  }

  const removeItem = async () => {
    if (props.currentUser.id) {
      await props.remove(id)
      props.loadCart()
    }
    if (!props.currentUser.id) {
      removeFromLocalCart(product)
      location.reload()
      return false
    }
  }

  return (
    <div className="m-3">
      <Row>
        <Card style={{width: '18rem'}}>
          <Container>
            <Row>
              <Col>
                <Card.Img variant="top" src={imageUrl} />
              </Col>
              <Col>
                <Card.Body>
                  <Card.Title className="my-3">{name}</Card.Title>
                  <Card.Text className="my-3">Price: ${newPrice}</Card.Text>
                  <Card.Text className="my-3">Total: ${itemTotal}</Card.Text>
                  <Row className="d-flex flex-wrap">
                    <Row className="mx-3">
                      <Button onClick={() => decrement()} variant="primary">
                        -
                      </Button>
                      <div className="align-self-center mx-2">
                        <div className="itemQuant">
                          <Card.Text>
                            Quantity: <span>{quantity}</span>
                          </Card.Text>
                        </div>
                      </div>
                      <Button
                        variant="primary"
                        onClick={() => {
                          quantity < maxQuant
                            ? increment()
                            : alert(
                                'Sorry, you have reached the maximum quantity available for purchase'
                              )
                        }}
                      >
                        +
                      </Button>
                    </Row>
                    <Button onClick={() => removeItem()} variant="primary">
                      Remove
                    </Button>
                  </Row>
                </Card.Body>
              </Col>
            </Row>
          </Container>
        </Card>
      </Row>
    </div>
  )
}

const mapState = state => ({
  currentUser: state.currentUser
})

const mapDispatch = dispatch => ({
  increase: item => dispatch(incrementQuantity(item)),
  decrease: item => dispatch(decrementQuantity(item)),
  remove: item => dispatch(deleteItem(item))
})

export default connect(mapState, mapDispatch)(CartProductDetail)
