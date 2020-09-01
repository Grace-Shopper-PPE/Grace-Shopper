import React, {Component} from 'react'
import {connect} from 'react-redux'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

/**
 * COMPONENT
 */
export class Profile extends Component {
  render() {
    const {currentUser} = this.props
    const {firstName, lastName, email, address, phoneNumber} = currentUser
    return (
      <div>
        <h3>My Profile</h3>
        <Card style={{width: '50rem'}}>
          <Container>
            <Row>
              <Col>
                <Card.Body>
                  <Card.Title>
                    {firstName} {lastName}
                  </Card.Title>
                  <Card.Subtitle>{email}</Card.Subtitle>
                  <Card.Text>{address}</Card.Text>
                  <Card.Text>{phoneNumber}</Card.Text>
                  <Row />
                </Card.Body>
              </Col>
            </Row>
          </Container>
        </Card>
      </div>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = ({currentUser}) => ({currentUser})

export default connect(mapState)(Profile)
