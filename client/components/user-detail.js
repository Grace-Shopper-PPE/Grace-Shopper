import React from 'react'
import {Link} from 'react-router-dom'
import {SingleUser} from './single-user'

/**
 * COMPONENT
 */
const UserDetail = function(props) {
  const {id, firstName, lastName, email} = props.user
  return (
    <div>
      <Link to={`users/${id}`}>
        {id} {firstName} {lastName} {email}
      </Link>
    </div>
  )
}

export default UserDetail