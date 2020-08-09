import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import {connect} from 'react-redux'
import {fetchCart, incrementQuantity} from '../store/cart'

const CartProductDetail = props => {
  const {product, quantity, orderId, productId} = props.product
  const newPrice = (product.price / 100).toFixed(2)

  const increment = async (orderId, productId) => {
    const productToIncrement = {
      orderId,
      productId
    }
    await props.add(productToIncrement)
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
                      <Button variant="primary">-</Button>
                      <div className="align-self-center mx-2">
                        <Card.Text>Quantity: {quantity}</Card.Text>
                      </div>
                      <Button
                        onClick={() => increment(orderId, productId)}
                        variant="primary"
                      >
                        +
                      </Button>
                    </Row>

                    <Button variant="primary">Remove</Button>
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
  add: item => dispatch(incrementQuantity(item))
})

export default connect(null, mapDispatch)(CartProductDetail)
