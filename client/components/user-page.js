import React from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const User = props => {
  const {user, removeCallBack} = props
  const {id, firstName, lastName, email, address, phoneNumber} = user
  return (
    <div>
      <h3>User Profile</h3>
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
                <Row>
                  <Col className="d-flex justify-content-end">
                    <Link to={`/users/${id}/edit`}>
                      <i
                        className="fa fa-edit fa-2x"
                        onClick={() => {
                          console.log('clicked edit!')
                        }}
                      />
                    </Link>
                    <i
                      className="fa fa-trash fa-2x"
                      onClick={() => removeCallBack(id)}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Col>
          </Row>
        </Container>
      </Card>
    </div>
  )
}

export default User
