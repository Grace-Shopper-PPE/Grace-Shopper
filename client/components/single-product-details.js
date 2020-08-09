import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {connect} from 'react-redux'
import {incrementQuantity, addItem} from '../store/cart'

/**
 * COMPONENT
 */
const SingleProductDetail = props => {
  const {id, name, price, imageUrl} = props.product
  const newPrice = (price / 100).toFixed(2)
  const productUrl = `/products/${id}`

  const addToCart = async id => {
    const containsItem = props.cart.filter(item => {
      return item.productId === id
    })
    if (containsItem.length) {
      await props.add({id, inc: 'inc'})
    } else {
      await props.addNew({id})
    }
  }

  return (
    <div className="m-3" href={productUrl}>
      <Card style={{width: '18rem'}}>
        <Card.Img variant="top" src={imageUrl} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>${newPrice}</Card.Text>
          <Button onClick={() => addToCart(id)} variant="primary">
            Add To Cart
          </Button>
        </Card.Body>
      </Card>
    </div>
  )
}

const mapState = state => ({
  cart: state.cart
})

const mapDispatch = dispatch => ({
  add: item => dispatch(incrementQuantity(item)),
  addNew: id => dispatch(addItem(id))
})

export default connect(mapState, mapDispatch)(SingleProductDetail)
