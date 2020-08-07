import React from 'react'
import ProductForm from './product-form'
import {connect} from 'react-redux'
import {
  getSingleProduct,
  fetchUpdatedSingleProduct,
  fetchSingleProduct
} from '../store/single-product'

export class ProductUpdate extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   name: '',
    //   description: '',
    //   price: '',
    //   color: '',
    //   size: '',
    //   category: '',
    //   quantity: '',
    //   vendor: '',
    //   sku: '',
    //   imageUrl: ''
    // }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps !== this.props) {
  //     this.setState({...this.props.student})
  //   }
  // }

  // handleChange(event) {
  //   this.setState({[event.target.name]: event.target.value})
  // }

  handleSubmit(event) {
    // try {
    //   event.preventDefault()
    //   const id = Number(this.props.match.params.id)
    //   await this.props.updateSingleProduct(id)
    //   this.props.getSingleProduct(id)
    // } catch (error) {
    //   console.error(error)
    // }

    event.preventDefault()
    const id = Number(this.props.match.params.id)
    console.log(id, 'the id')
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
    this.props.editSingleProduct(id, {
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
        <p>Edit Product #{Number(this.props.match.params.id)}: </p>
        <ProductForm handleSubmit={this.handleSubmit} product={this.props} />
      </div>
    )
  }
}

const mapState = state => {
  return {
    singleProduct: state.singleProduct
  }
}

const mapDispatch = dispatch => ({
  getSingleProduct: productId => dispatch(fetchSingleProduct(productId)),
  editSingleProduct: (productId, product) =>
    dispatch(fetchUpdatedSingleProduct(productId, product))
})

export default connect(mapState, mapDispatch)(ProductUpdate)