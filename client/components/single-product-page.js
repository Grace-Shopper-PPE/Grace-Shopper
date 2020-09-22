import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct, deleteSingleProduct} from '../store/single-product'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import RemoveEditProductBtn from './remove-edit-product-btn'

import {incrementQuantity, addItem} from '../store/cart'
import {addToLocalCart} from './local-cart'
import {addToCart} from './single-product-details'
import CartModal from './add-to-cart-modal'

/**
 * COMPONENT
 */
export class SingleProductPage extends React.Component {
  constructor() {
    super()
    this.remove = this.remove.bind(this)
    this.addToCart = this.addToCart.bind(this)
  }

  componentDidMount() {
    const productId = Number(this.props.match.params.id)
    this.props.getSingleProduct(productId)
  }

  async remove(productId) {
    await this.props.removeProduct(productId)
    this.props.history.push('/products')
  }

  addToCart = async (id, name, price, imageUrl) => {
    if (this.props.currentUser.id) {
      const containsItem = this.props.cart.filter(item => {
        return item.productId === id
      })
      if (containsItem.length) {
        await this.props.add({id, inc: 'inc'})
      } else {
        await this.props.addNew({id})
      }
      document.querySelector('.cart-nav span').textContent =
        Number(document.querySelector('.cart-nav span').textContent) + 1
    } else {
      addToLocalCart(id, name, price, imageUrl)
    }
  }

  render() {
    const {id, name, price, imageUrl, description} = this.props.singleProduct
    const newPrice = (price / 100).toFixed(2)
    return (
      <div>
        <h3>Welcome to a single product page</h3>
        <div>
          <Card style={{width: '50rem'}}>
            <Container>
              <Row>
                <Col>
                  <Card.Img variant="top" src={imageUrl} />
                </Col>
                <Col>
                  <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Subtitle>${newPrice}</Card.Subtitle>
                    <Card.Text>{description}</Card.Text>
                    <Row>
                      <Col>
                        <CartModal
                          name={name}
                          id={id}
                          newPrice={newPrice}
                          addToCart={this.addToCart}
                        />
                      </Col>

                      <RemoveEditProductBtn id={id} remove={this.remove} />
                    </Row>
                  </Card.Body>
                </Col>
              </Row>
            </Container>
          </Card>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  singleProduct: state.singleProduct,
  cart: state.cart,
  currentUser: state.currentUser
})

const mapDispatch = dispatch => ({
  getSingleProduct: productId => dispatch(fetchSingleProduct(productId)),
  removeProduct: productId => dispatch(deleteSingleProduct(productId)),
  add: item => dispatch(incrementQuantity(item)),
  addNew: id => dispatch(addItem(id))
})

export default connect(mapState, mapDispatch)(SingleProductPage)
