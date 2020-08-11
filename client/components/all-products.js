import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'
import SingleProductDetail from './single-product-details'
import CardDeck from 'react-bootstrap/CardDeck'
import ProdPagination from './pagination'
/**
 * COMPONENT
 */

export class AllProducts extends React.Component {
  // constructor(props) {
  //   super(props)
  //    this.state = {
  //      activePage :1
  //     }

  // }

  // handlePageChange(pageNumber) {

  // console.log(`active page is ${pageNumber}`);

  // this.setState({activePage: pageNumber});

  // }

  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const products = this.props.products
    return (
      <div>
        <h3>Welcome to the product page</h3>
        <div className="d-flex justify-content-center">
          <CardDeck>
            {products.length > 0
              ? products.map(product => {
                  const {id} = product
                  return <SingleProductDetail key={id} product={product} />
                })
              : `We are currently out of stock of the products you are looking for.`}
            {/* <ProdPagination products={products}/> */}
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
  getProducts: () => dispatch(fetchProducts())
})

export default connect(mapState, mapDispatch)(AllProducts)
