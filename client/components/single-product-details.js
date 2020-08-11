import React, {Component} from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {connect} from 'react-redux'
import {incrementQuantity, addItem} from '../store/cart'
import {deleteSingleProduct} from '../store/products'
import RemoveEditProductBtn from './remove-edit-product-btn'
import CartModal from './add-to-cart-modal'
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
    <div className="m-3" type="product-card">
      <Card style={{width: '18rem', height: '25rem'}}>
        <Card.Img variant="top" src={imageUrl} />
        <Card.Body>
          <a href={productUrl}>
            <Card.Title>{name}</Card.Title>
          </a>
          <Card.Text>${newPrice}</Card.Text>
          <CartModal
            addToCart={addToCart}
            id={id}
            name={name}
            imageUrl={imageUrl}
            newPrice={newPrice}
          />
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
