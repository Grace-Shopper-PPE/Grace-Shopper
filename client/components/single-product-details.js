import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

/**
 * COMPONENT
 */
const SingleProductDetail = props => {
  const {name, price, imageUrl} = props.product
  const newPrice = (price / 100).toFixed(2)
  console.log(props.product)
  return (

    <div className="m-3">
      <Card style={{width: '18rem'}}>
        <Card.Img variant="top" src={imageUrl} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>${newPrice}</Card.Text>
          <Button variant="primary">Add To Cart</Button>
        </Card.Body>
      </Card>

    <div>
      <p>{name}</p>
      <p>${newPrice}</p>
      <img src={imageUrl} alt={name} />

    </div>
  )
}

export default SingleProductDetail
