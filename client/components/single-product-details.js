import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {connect} from 'react-redux'
import {incrementQuantity, addItem} from '../store/cart'
import {addToLocalCart} from './local-cart'
import RemoveEditProductBtn from './remove-edit-product-btn'
import CartModal from './add-to-cart-modal'
/**
 * COMPONENT
 */

const SingleProductDetail = props => {
  const {id, name, price, imageUrl} = props.product
  const newPrice = (price / 100).toFixed(2)
  const productUrl = `/products/${id}`
  const {removeProduct} = props

  const addToCart = () => {
    if (props.currentUser.id) {
      const containsItem = props.cart.filter(item => {
        return item.productId === id
      })
      if (containsItem.length) {
        props.add({id, inc: 'inc'})
      } else {
        props.addNew({id})
      }
      // document.querySelector('.cart-nav span').textContent =
      //   Number(document.querySelector('.cart-nav span').textContent) + 1
    } else {
      addToLocalCart(id, name, price, imageUrl)
    }
  }
  const remove = productId => {
    removeProduct(productId)
  }

  return (
    <div className="m-3" href={productUrl}>
      <Card style={{width: '18rem'}}>
        <Card.Img variant="top" src={imageUrl} />
        <Card.Body>
          <a href={`/products/${id}`}>
            <Card.Title>{name}</Card.Title>
          </a>
          <Card.Text>${newPrice}</Card.Text>
          {/* <Button onClick={() => addToCart()} variant="primary">
            Add To Cart
          </Button> */}
          <CartModal
            name={name}
            id={id}
            newPrice={newPrice}
            addToCart={addToCart}
          />
          <RemoveEditProductBtn id={id} remove={remove} />
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
  addNew: id => dispatch(addItem(id)),
  removeProduct: productId => dispatch(deleteSingleProduct(productId))
})

export default connect(mapState, mapDispatch)(SingleProductDetail)
