import React from 'react'
import ProductForm from './product-form'
import {connect} from 'react-redux'
import {postSingleProduct} from '../store/single-product'

export class ProductAdd extends React.Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    const name = event.target.name.value
    const description = event.target.description.value
    const price = event.target.price.value
    const category = event.target.category.value
    const quantity = event.target.quantity.value
    const imageUrl = event.target.imageUrl.value
    const color = event.target.color.value
    const size = event.target.size.value
    const vendor = event.target.vendor.value
    const sku = event.target.sku.value
    this.props.newProduct({
      name,
      description,
      price,
      category,
      quantity,
      imageUrl,
      color,
      size,
      vendor,
      sku
    })
    event.target.name.value = ''
    event.target.price.value = ''
    event.target.description.value = ''
    event.target.category.value = ''
    event.target.quantity.value = ''
    event.target.imageUrl.value = ''
    event.target.color.value = ''
    event.target.size.value = ''
    event.target.vendor.value = ''
    event.target.sku.value = ''
  }

  render() {
    console.log(this.props, 'the props')
    return (
      <div className="new-product-form">
        <p>Add Product: </p>
        <ProductForm handleSubmit={this.handleSubmit} product={this.props} />
      </div>
    )
  }
}

const mapState = state => {
  return {
    product: state.product
  }
}

const mapDispatch = dispatch => ({
  newProduct: product => dispatch(postSingleProduct(product))
})

export default connect(mapState, mapDispatch)(ProductAdd)
