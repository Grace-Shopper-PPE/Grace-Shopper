import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct, deleteSingleProduct} from '../store/single-product'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import RemoveEditProductBtn from './remove-edit-product-btn'

/**
 * COMPONENT
 */
export class SingleProductPage extends React.Component {
  constructor() {
    super()
    this.remove = this.remove.bind(this)
  }

  componentDidMount() {
    const productId = Number(this.props.match.params.id)
    this.props.getSingleProduct(productId)
  }

  remove(productId) {
    this.props.removeProduct(productId)
    // I don't know how to re-render the updated all products component without using setTimeout becuase it refreshes the page.
    // this.props.history.push('/products')
    const {push} = this.props.history
    setTimeout(function() {
      push('/products')
    }, 1000)
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
                        <Button variant="primary">Add To Cart</Button>
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
  singleProduct: state.singleProduct
})

const mapDispatch = dispatch => ({
  getSingleProduct: productId => dispatch(fetchSingleProduct(productId)),
  removeProduct: productId => dispatch(deleteSingleProduct(productId))
})

export default connect(mapState, mapDispatch)(SingleProductPage)
