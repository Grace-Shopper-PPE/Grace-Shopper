import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import {connect} from 'react-redux'
import {incrementQuantity, decrementQuantity, deleteItem} from '../store/cart'

const CartProductDetail = props => {
  const {product, quantity, productId} = props.product
  const newPrice = (product.price / 100).toFixed(2)
  const maxQuant = product.quantity

  const increment = async id => {
    await props.increase({id, inc: 'inc'})
    props.loadCart()
  }

  const decrement = async id => {
    if (quantity > 1) {
      await props.decrease({id, dec: 'dec'})
    } else {
      await props.remove(id)
    }
    props.loadCart()
  }

  const removeItem = async id => {
    await props.remove(id)
    props.loadCart()
  }

  return (
    <div className="m-3">
      <Row>
        <Card style={{width: '18rem'}}>
          <Container>
            <Row>
              <Col>
                <Card.Img variant="top" src={product.imageUrl} />
              </Col>
              <Col>
                <Card.Body>
                  <Card.Title className="my-3">{product.name}</Card.Title>
                  <Card.Text className="my-3">${newPrice}</Card.Text>
                  <Row className="d-flex flex-wrap">
                    <Row className="mx-3">
                      <Button
                        onClick={() => decrement(productId)}
                        variant="primary"
                      >
                        -
                      </Button>
                      <div className="align-self-center mx-2">
                        <Card.Text>Quantity: {quantity}</Card.Text>
                      </div>
                      <Button
                        variant="primary"
                        onClick={() => {
                          quantity < maxQuant
                            ? increment(productId)
                            : alert(
                                'Sorry, you have reached the maximum quantity available for purchase'
                              )
                        }}
                      >
                        +
                      </Button>
                    </Row>

                    <Button
                      onClick={() => removeItem(productId)}
                      variant="primary"
                    >
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

const mapDispatch = dispatch => ({
  increase: item => dispatch(incrementQuantity(item)),
  decrease: item => dispatch(decrementQuantity(item)),
  remove: item => dispatch(deleteItem(item))
})

export default connect(null, mapDispatch)(CartProductDetail)
