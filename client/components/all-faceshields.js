import React from 'react'
import {connect} from 'react-redux'
import {fetchFaceshields} from '../store/products'
import SingleProductDetail from './single-product-details'
import CardDeck from 'react-bootstrap/CardDeck'

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
        <div className="d-flex justify-content-center">
          <CardDeck>
            {products.length > 0
              ? products.map(product => (
                  <SingleProductDetail key={product.id} product={product} />
                ))
              : `We are currently out of stock of the products you are looking for.`}
          </CardDeck>
        </div>
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
