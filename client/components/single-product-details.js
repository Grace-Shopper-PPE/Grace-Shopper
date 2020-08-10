import React, {Component} from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {connect} from 'react-redux'
import {incrementQuantity, addItem} from '../store/cart'
import {deleteSingleProduct} from '../store/products'
import RemoveEditProductBtn from './remove-edit-product-btn'
/**
 * COMPONENT
 */

const SingleProductDetail = props => {
  const {id, name, price, imageUrl} = props.product
  const newPrice = (price / 100).toFixed(2)
  const productUrl = `/products/${id}`

  const addToCart = async pid => {
    if (props.currentUser.id) {
      const containsItem = props.cart.filter(item => {
        return item.productId === pid
      })
      if (containsItem.length) {
        await props.add({id: pid, inc: 'inc'})
      } else {
        await props.addNew({id: pid})
      }
    } else {
      let localCart = localStorage.getItem('CART')
      localCart = localCart ? localCart.split('},{') : []
      localCart.push({id: pid, name, price})
      const stringCart = JSON.stringify(localCart)
      console.log('cart before set', stringCart)
      localStorage.setItem('CART', stringCart)

      console.log('newcart', localStorage.getItem('CART'))
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
  cart: state.cart,
  currentUser: state.currentUser
})

const mapDispatch = dispatch => ({
  add: item => dispatch(incrementQuantity(item)),
  addNew: id => dispatch(addItem(id))
})

export default connect(mapState, mapDispatch)(SingleProductDetail)
