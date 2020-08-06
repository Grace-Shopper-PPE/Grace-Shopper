import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/single-product'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

/**
 * COMPONENT
 */
export class SingleProductPage extends React.Component {
  componentDidMount() {
    const productId = Number(this.props.match.params.id)
    console.log(productId)
    this.props.getSingleProduct(productId)
  }

  render() {
    const {name, price, imageUrl, description} = this.props.singleProduct
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
                    <Button variant="primary">Add To Cart</Button>
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
  getSingleProduct: productId => dispatch(fetchSingleProduct(productId))
})

export default connect(mapState, mapDispatch)(SingleProductPage)
