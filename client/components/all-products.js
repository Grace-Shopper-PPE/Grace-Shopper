import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'

/**
 * COMPONENT
 */
export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    return (
      <div>
        <h3>Welcome to the product page</h3>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  getProducts: () => dispatch(fetchProducts())
})

export default connect(null, mapDispatch)(AllProducts)
