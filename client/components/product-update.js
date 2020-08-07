import React from 'react'
import ProductForm from './product-form'

export class ProductUpdate extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      price: '',
      color: undefined,
      size: undefined,
      category: undefined,
      quantity: undefined,
      vendor: undefined,
      sku: undefined,
      imageUrl: undefined
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({...this.props.student})
    }
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  async handleSubmit(event) {
    try {
      event.preventDefault()
      await this.props.updateSingleProduct(this.state)
      this.props.getSingleProduct(this.props.id)
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    return (
      <div className="new-product-form">
        <p>Edit Product:</p>
        <ProductForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          {...this.state}
        />
      </div>
    )
  }
}
