import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

/**
 * COMPONENT
 */
const CartProductDetail = props => {
  const {productId, quantity, orderId} = props.product

  const newPrice = (price / 100).toFixed(2)
  const productUrl = `/products/${id}`

  return (
    <div className="m-3" href={productUrl}>
      <Card style={{width: '18rem'}}>
        <Card.Img variant="top" src={imageUrl} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>${newPrice}</Card.Text>
          <Button variant="primary">Add To Cart</Button>
        </Card.Body>
      </Card>
    </div>
  )
}

export default CartProductDetail
