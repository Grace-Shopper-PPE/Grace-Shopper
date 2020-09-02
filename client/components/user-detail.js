import React from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserDetail = props => {
  const {user, removeUser} = props
  const {id, firstName, lastName, email} = user

  return (
    <div>
      <Card style={{width: '18rem'}}>
        <Card.Body>
          <a href={`users/${id}`}>
            <Card.Title>
              {firstName} {lastName}
            </Card.Title>
            <Card.Text>{email}</Card.Text>
          </a>
          <Col className="d-flex justify-content-end">
            <Link to={`/users/${id}/edit`}>
              <i
                className="fa fa-edit fa-2x"
                onClick={() => {
                  console.log('clicked edit!')
                }}
              />
            </Link>
            <i className="fa fa-trash fa-2x" onClick={() => removeUser(id)} />
          </Col>
        </Card.Body>
      </Card>
    </div>
  )
}

export default UserDetail
