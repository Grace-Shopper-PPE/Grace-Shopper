import React from 'react'
import {Link} from 'react-router-dom'
import {SingleUser} from './single-user'

/**
 * COMPONENT
 */
const UserDetail = function(props) {
  const {user} = props
  const {id, firstName, lastName, email} = user

  return (
    <div>

      <Link to={`/users/${id}`}>
        <span>
          {firstName} {lastName}
        </span>
        <p>{email}</p>
      </Link>
    </div>
  )
}

export default UserDetail
