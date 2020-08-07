import React from 'react'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
const UserDetail = function(props) {
  const {user} = props
  const {id, firstName, lastName, email} = user

  return (
    <div>
      <Link to={`users/${id}`}>
        {id} {firstName} {lastName} {email}
      </Link>
    </div>
  )
}

export default UserDetail
