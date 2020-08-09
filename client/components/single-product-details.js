import React, {Component} from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {connect} from 'react-redux'
import {deleteSingleProduct} from '../store/products'
import RemoveEditProductBtn from './remove-edit-product-btn'

/**
 * COMPONENT
 */
export class SingleProductDetail extends Component {
  constructor() {
    super()
    this.remove = this.remove.bind(this)
  }

  remove(productId) {
    this.props.removeProduct(productId)
  }

  render() {
    const {id, name, price, imageUrl} = this.props.product
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
            <RemoveEditProductBtn id={id} remove={this.remove} />
          </Card.Body>
        </Card>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  removeProduct: productId => dispatch(deleteSingleProduct(productId))
})

export default connect(null, mapDispatch)(SingleProductDetail)
