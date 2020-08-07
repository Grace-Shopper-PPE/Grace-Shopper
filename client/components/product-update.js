import React from 'react'
import ProductForm from './product-form'
import {connect} from 'react-redux'
import {
  getSingleProduct,
  updatedSingleProduct,
  fetchSingleProduct
} from '../store/single-product'

export class ProductUpdate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      price: '',
      color: '',
      size: '',
      category: '',
      quantity: '',
      vendor: '',
      sku: '',
      imageUrl: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSubmit = this.handleChange.bind(this)
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps !== this.props) {
  //     this.setState({...this.props.student})
  //   }
  // }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

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
    const id = this.props.id
    const name = event.target.name.value
    const description = event.target.description.value
    const price = event.target.description.value
    const category = event.target.category.value
    const quantity = event.target.quantity.value
    this.props.updatedSingleProduct(id, {
      name,
      description,
      price,
      category,
      quantity
    })
    event.target.name.value = ''
    event.target.price.value = ''
    event.target.description.value = ''
    event.target.category.value = ''
    event.target.quantity.value = ''
  }

  render() {
    console.log(this.props)
    return (
      <div className="new-product-form">
        <p>Edit Product:</p>
        <ProductForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          product={this.props}
        />
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
  updateSingleProduct: productId => dispatch(updateSingleProduct(productId))
})

export default connect(mapState, mapDispatch)(ProductUpdate)
