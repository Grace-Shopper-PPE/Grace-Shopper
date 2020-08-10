import React from 'react'
import Col from 'react-bootstrap/Col'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const RemoveEditProductBtn = props => {
  const {isAdmin, id, remove} = props

  return (
    <div>
      {isAdmin &&
        isAdmin === true && (
          <Col className="d-flex justify-content-end">
            <Link to={`/products/${id}/edit`}>
              {' '}
              <i
                className="fa fa-edit fa-2x"
                onClick={() => {
                  console.log('clicked edit!')
                }}
              />{' '}
            </Link>
            <i className="fa fa-trash fa-2x" onClick={() => remove(id)} />
          </Col>
        )}
    </div>
  )
}

const mapState = state => ({
  isAdmin: state.currentUser.isAdmin
})

export default connect(mapState)(RemoveEditProductBtn)
