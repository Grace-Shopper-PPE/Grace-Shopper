import React from 'react'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Trending = () => {
  return (
    <div className="m-3" href="/products/1" type="trend">
      <Container>
        <h3>Trending</h3>
        <Row>
          {/* <Col> */}

          {/* <Card style={{width: '18rem'}}>
      <Card.Header>Mask</Card.Header>
        <Card.Img top width="100%" style={{width: '15rem', height: 'rem'}}
          
          src="https://ih1.redbubble.net/image.1193579924.0976/ur,mask_three_quarter,tall_portrait,750x1000.jpg"
        />
        </Card>
    </Col>5 */}
          <Col>
            <Card style={{width: '18rem'}}>
              <Card.Header>Shield</Card.Header>
              <Card.Img src="https://images-na.ssl-images-amazon.com/images/I/71zhmlTLx8L._SX342_.jpg" />
            </Card>
          </Col>

          <Col>
            <Card style={{width: '18rem'}}>
              <Card.Header>Sanitizer</Card.Header>
              <Card.Img src="https://www.honest.com/dw/image/v2/BDBW_PRD/on/demandware.static/-/Sites-HC-master-catalog/default/dw3b7e00c3/images/large/Hand-Sanitizer-Gel/handsanitizer_group_large_front.jpg.jpg?sw=2000&sh=2000&sm=fit" />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Trending
