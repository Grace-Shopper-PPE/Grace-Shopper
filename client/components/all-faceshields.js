import React from 'react'
import {connect} from 'react-redux'
import {fetchFaceshields} from '../store/products'
import SingleProductDetail from './single-product-details'

/**
 * COMPONENT
 */
export class AllFaceshields extends React.Component {
  componentDidMount() {
    this.props.getFaceshields()
  }

  render() {
    const products = this.props.products
    return (
      <div>
        <h3>Welcome to the faceshield page</h3>
        {products.length > 0
          ? products.map(product => (
              <SingleProductDetail key={product.id} product={product} />
            ))
          : `We are currently out of stock of the products you are looking for.`}
      </div>
    )
  }
}

const mapState = state => ({
  products: state.products
})

const mapDispatch = dispatch => ({
  getFaceshields: () => dispatch(fetchFaceshields())
})

export default connect(mapState, mapDispatch)(AllFaceshields)
